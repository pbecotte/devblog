from flask import Blueprint, current_app, jsonify, request, flash, render_template, redirect, url_for
from flask.ext.security import login_required, current_user
from .forms import CreateForm, ImageForm
from .images import handle_image
from .models import Entry
from blog.utils import object_list, get_object_or_404, json_object_list

entry = Blueprint('entry', __name__)


@entry.route('/')
def index():
    query, search_query = index_func()
    return object_list('index.html', query, search=search_query)


def index_func():
    search_query = request.args.get('q')
    if search_query:
        query = Entry.search(search_query)
    else:
        query = Entry.public().order_by(Entry.timestamp.desc())
    return query, search_query


@entry.route('/drafts/')
@login_required
def drafts():
    query = Entry.drafts().order_by(Entry.timestamp.desc())
    return object_list('index.html', query)


@entry.route('/<slug>/')
def detail(slug):
    if current_user.is_authenticated():
        query = Entry.query
    else:
        query = Entry.public()
    entry = get_object_or_404(query, Entry.slug == slug)
    image_url = '{bucket}{path}/{filename}'.format(
        bucket=current_app.config['S3_LOCATION'],
        path=current_app.config['S3_UPLOAD_DIRECTORY'],
        filename=entry.image) if entry.image else ''
    return render_template('detail.html', entry=entry, image=image_url)


@entry.route('/create/', methods=['GET', 'POST'])
@login_required
def create():
    form = CreateForm()
    if request.method == 'POST':
        if form.title and form.content:
            image = form.image if form.image else None

            entry = Entry.create(
                title=form.title.data,
                tagline=form.tagline.data,
                content=form.content.data,
                published=form.published.data,
                image=image
            )
            flash('Entry created successfully.', 'success')
            if entry.published:
                return redirect(url_for('entry.detail', slug=entry.slug))
            else:
                return redirect(url_for('entry.edit', slug=entry.slug))
        else:
            flash('Title and Content are required.', 'danger')

    image_form = ImageForm()
    return render_template('create.html', form=form, image_form=image_form)


@entry.route('/<slug>/edit/', methods=['GET', 'POST'])
@login_required
def edit(slug):
    entry = get_object_or_404(Entry.query, Entry.slug == slug)
    if request.method == 'POST':
        form = CreateForm()
        if form.title and form.content:
            entry.title = form.title.data
            entry.tagline = form.tagline.data
            entry.image = handle_image(form.image) if form.image.data else entry.image
            entry.content = form.content.data
            entry.published = form.published.data
            entry.save()

            flash('Entry saved successfully.', 'success')
            if entry.published:
                return redirect(url_for('entry.detail', slug=entry.slug))
            else:
                return redirect(url_for('entry.edit', slug=entry.slug))
        else:
            flash('Title and Content are required.', 'danger')

    form = CreateForm(obj=entry)
    image_form = ImageForm()
    return render_template('edit.html', entry=entry, form=form, image_form=image_form)


@entry.route('/upload_image/', methods=['POST'])
@login_required
def upload_image():
    form = ImageForm()
    image_name = handle_image(form.image) if form.image else ''
    return '{bucket}{path}/{filename}'.format(
        bucket=current_app.config['S3_LOCATION'],
        path=current_app.config['S3_UPLOAD_DIRECTORY'],
        filename=image_name)
