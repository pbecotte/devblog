from blog.orm import db
from blog.security.models import user_datastore
from blog.application import create_app

from argparse import ArgumentParser


def main(email, password):
    app = create_app()
    with app.app_context():

        user_datastore.create_user(email=email, password=password)
        db.session.commit()


if __name__ == '__main__':

    parser = ArgumentParser()
    parser.add_argument('email', help='users email address')
    parser.add_argument('password', help='users password')
    args = parser.parse_args()
    main(args.email, args.password)
