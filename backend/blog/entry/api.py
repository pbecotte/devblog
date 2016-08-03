from flask import Blueprint, current_app, jsonify, request
from flask.ext.security import current_user, login_required
from marshmallow import fields, Schema, ValidationError

from blog.entry.forms import UpdateForm
from blog.entry.models import Entry
from blog.orm import db
from blog.utils import get_object_or_404

ENTRY_API = Blueprint('entry_api', __name__)


class EntryStubSchema(Schema):
    id = fields.Integer()
    title = fields.Str()
    slug = fields.Str()
    tagline = fields.Str()
    published = fields.Boolean()
    timestamp = fields.DateTime()
    image = fields.Str(dump_only=True)


class EntryDetailSchema(EntryStubSchema):
    html_content = fields.Str(dump_only=True)
    content = fields.Str()


@ENTRY_API.route('/api/entries/')
def api_index():
    entries = Entry.public().order_by(Entry.timestamp.desc()).all()
    data = EntryStubSchema(many=True).dump(entries).data
    return jsonify(data=data)


@ENTRY_API.route('/api/drafts/')
@login_required
def api_drafts():
    entries = Entry.drafts().order_by(Entry.timestamp.desc()).all()
    data = EntryStubSchema(many=True).dump(entries).data
    return jsonify(data=data)


@ENTRY_API.route('/api/entries/<slug>/')
def api_entry(slug):
    if current_user.is_authenticated():
        query = Entry.query
    else:
        query = Entry.public()
    entry_model = get_object_or_404(query, Entry.slug == slug)
    entry = EntryDetailSchema().dump(entry_model).data
    image_url = '{bucket}{path}/{filename}'.format(
        bucket=current_app.config['S3_LOCATION'],
        path=current_app.config['S3_UPLOAD_DIRECTORY'],
        filename=entry_model.image) if entry_model.image else ''
    return jsonify(data={'entry': entry, 'image': image_url})


@ENTRY_API.route('/api/entries/<slug>/edit/', methods=['PUT'])
@login_required
def api_update_entry(slug):
    entry = get_object_or_404(Entry.query, Entry.slug == slug)
    form = UpdateForm()
    try:
        input_dict = EntryDetailSchema(strict=True).loads(form.entry.data).data
        for key, value in input_dict.items():
            setattr(entry, key, value)
        entry.image = form.image if form.image else entry.image
        db.session.commit()
        output = EntryDetailSchema().dump(entry).data
        return jsonify(data={'entry': output}, messages=['Saved!'])
    except ValidationError as err:
        resp = jsonify({"error": err.messages})
        resp.status_code = 401
        return resp
