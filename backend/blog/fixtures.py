from alembic import command, config

from blog.application import create_app
from blog.orm import db
from blog.security.models import user_datastore

app = create_app()

cfg = config.Config('alembic.ini')
cfg.set_main_option('sqlalchemy.url', app.config["SQLALCHEMY_DATABASE_URI"])
command.downgrade(cfg, "base")
command.upgrade(cfg, "head")


with app.app_context():
    print("Adding database fixtures")
    user_datastore.create_user(email='admin@blog.example', password='password1234')
    db.session.add_all([])
    db.session.commit()
    print("Database populated")
