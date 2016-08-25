from datetime import datetime

from flask import Blueprint, current_app, jsonify, request
from flask.ext.security import current_user, login_required, roles_accepted
from marshmallow import fields, post_load, Schema, ValidationError

from blog.entry.forms import UpdateForm
from blog.entry.models import Entry, Comment
from blog.orm import db
from blog.utils import get_object_or_404

ENTRY_API = Blueprint('entry_api', __name__)


class EntryStubSchema(Schema):
    id = fields.Integer()
    title = fields.Str()
    slug = fields.Str(dump_only=True)
    tagline = fields.Str()
    published = fields.Boolean()
    timestamp = fields.DateTime()
    image = fields.Str(dump_only=True)


class EntryDetailSchema(EntryStubSchema):
    html_content = fields.Str(dump_only=True)
    content = fields.Str()


class CommentSchema(Schema):
    id = fields.Integer()
    username = fields.Str(attribute="user.alias", dump_only=True)
    text = fields.Str()
    timestamp = fields.DateTime()

    @post_load
    def make_user(self, data):
        return Comment(**data)


@ENTRY_API.route('/api/entries/')
def api_index():
    entries = Entry.public().order_by(Entry.timestamp.desc()).all()
    data = EntryStubSchema(many=True).dump(entries).data
    return jsonify(data=data)


@ENTRY_API.route('/api/drafts/')
@roles_accepted('admin')
def api_drafts():
    entries = Entry.drafts().order_by(Entry.timestamp.desc()).all()
    data = EntryStubSchema(many=True).dump(entries).data
    return jsonify(data=data)


@ENTRY_API.route('/api/entries/<slug>/')
def api_entry(slug):
    if current_user.has_role('admin'):
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
@roles_accepted('admin')
def api_update_entry(slug):
    entry = get_object_or_404(Entry.query, Entry.slug == slug)
    form = UpdateForm()
    try:
        input_dict = EntryDetailSchema(strict=True).loads(form.entry.data).data
        for key, value in input_dict.items():
            setattr(entry, key, value)
        entry.image = form.image if form.image.data else entry.image
        db.session.commit()
        output = EntryDetailSchema().dump(entry).data
        return jsonify(data={'entry': output}, messages=['Saved!'])
    except ValidationError as err:
        resp = jsonify({"error": err.messages})
        resp.status_code = 401
        return resp


@ENTRY_API.route('/api/create/', methods=['POST'])
@roles_accepted('admin')
def api_create_entry():
    form = UpdateForm()
    try:
        input_dict = EntryDetailSchema(strict=True).loads(form.entry.data).data
        if form.image.data:
            input_dict['image'] = form.image
        entry = Entry.create(**input_dict)
        output = EntryDetailSchema().dump(entry).data
        return jsonify(data={'entry': output}, messages=['Saved!'])
    except ValidationError as err:
        resp = jsonify({"error": err.messages})
        resp.status_code = 401
        return resp


@ENTRY_API.route('/api/comments/<slug>')
def fetch_comments(slug):
    comments = Comment.query.join(Comment.post).filter(Entry.slug == slug).all()
    data = CommentSchema(many=True).dump(comments).data
    return jsonify(comments=data)


@ENTRY_API.route('/api/comments/<slug>', methods=['POST'])
@login_required
def add_comment(slug):
    comment = CommentSchema().load(request.json).data
    comment.user = current_user
    comment.post = Entry.query.filter(Entry.slug == slug).one()
    comment.timestamp = datetime.now()
    db.session.add(comment)
    db.session.commit()
    return jsonify(comment=CommentSchema().dump(comment).data)
