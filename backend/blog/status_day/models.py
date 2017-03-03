from blog.orm import db


class StatusDay(db.Model):
    date = db.Column('date', db.DateTime(), primary_key=True)
    status = db.Column('status', db.String(255))
