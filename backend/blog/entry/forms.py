from flask_wtf import Form
from wtforms import StringField, BooleanField, FileField, TextAreaField

class CreateForm(Form):
    title = StringField('title')
    tagline = StringField('tagline')
    image = FileField('image')
    content = TextAreaField('content')
    published = BooleanField('published')

class ImageForm(Form):
    image = FileField('image')

class UpdateForm(Form):
    image = FileField('image')
    entry = StringField('entry')
