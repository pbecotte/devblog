from datetime import datetime
from flask import Markup, current_app
from markdown import markdown
from markdown.extensions.codehilite import CodeHiliteExtension
from markdown.extensions.extra import ExtraExtension
from micawber import parse_html, bootstrap_basic
from micawber.cache import Cache as OEmbedCache
import re

from blog.orm import db

# Configure micawber with the default OEmbed providers (YouTube, Flickr, etc).
# We'll use a simple in-memory cache so that multiple requests for the same
# video don't require multiple network requests.
oembed_providers = bootstrap_basic(OEmbedCache())


class Entry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), unique=True)
    slug = db.Column(db.String(255), unique=True)
    content = db.Column(db.String(50000))
    published = db.Column(db.Boolean())
    timestamp = db.Column(db.DateTime(), default=datetime.now)

    @classmethod
    def create(cls, title, content, published=False):
        slug = re.sub('[^\w]+', '-', title.lower())
        e = Entry(title=title, content=content, published=published, slug=slug)
        db.session.add(e)
        db.session.commit()
        return e

    def save(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def public(cls):
        return Entry.query.filter(Entry.published)

    @classmethod
    def drafts(cls):
        return Entry.query.filter(Entry.published == False)

    @property
    def html_content(self):
        hilite = CodeHiliteExtension(linenums=False, css_class='highlight')
        extras = ExtraExtension()
        markdown_content = markdown(self.content, extensions=[hilite, extras])
        oembed_content = parse_html(
            markdown_content,
            oembed_providers,
            urlize_all=True,
            maxwidth=current_app.config['SITE_WIDTH'])
        return Markup(oembed_content)
