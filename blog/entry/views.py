from flask import Blueprint, request, flash, render_template, redirect, url_for
from flask.ext.security import login_required, current_user
from .models import Entry
from blog.utils import object_list, get_object_or_404

entry = Blueprint('entry', __name__)

@entry.route('/')
def index():
    search_query = request.args.get('q')
    if search_query:
        query = Entry.search(search_query)
    else:
        query = Entry.public().order_by(Entry.timestamp.desc())

    return object_list('index.html', query, search=search_query)


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
    print entry.html_content
    return render_template('detail.html', entry=entry)


@entry.route('/create/', methods=['GET', 'POST'])
@login_required
def create():
    if request.method == 'POST':
        if request.form.get('title') and request.form.get('content'):
            entry = Entry.create(
                title=request.form['title'],
                content=request.form['content'],
                published=request.form.get('published') == 'y')
            flash('Entry created successfully.', 'success')
            if entry.published:
                return redirect(url_for('entry.detail', slug=entry.slug))
            else:
                return redirect(url_for('entry.edit', slug=entry.slug))
        else:
            flash('Title and Content are required.', 'danger')
    return render_template('create.html')


@entry.route('/<slug>/edit/', methods=['GET', 'POST'])
@login_required
def edit(slug):
    entry = get_object_or_404(Entry.query, Entry.slug == slug)
    if request.method == 'POST':
        if request.form.get('title') and request.form.get('content'):
            entry.title = request.form['title']
            entry.content = request.form['content']
            entry.published = request.form.get('published') == 'y'
            entry.save()

            flash('Entry saved successfully.', 'success')
            if entry.published:
                return redirect(url_for('entry.detail', slug=entry.slug))
            else:
                return redirect(url_for('entry.edit', slug=entry.slug))
        else:
            flash('Title and Content are required.', 'danger')

    return render_template('edit.html', entry=entry)