from blog.orm import db
from blog.security.models import user_datastore
from blog.application import create_app

from argparse import ArgumentParser


def main(email, password):
    app = create_app()
    with app.app_context():

        user = user_datastore.create_user(email=email, password=password)
        admin = user_datastore.find_or_create_role('admin')
        user_datastore.add_role_to_user(user, admin)
        db.session.commit()

if __name__ == '__main__':

    parser = ArgumentParser()
    parser.add_argument('email', help='users email address')
    parser.add_argument('password', help='users password')
    parser.add_argument('alias', help='users display name')
    args = parser.parse_args()
    main(args.email, args.password)
