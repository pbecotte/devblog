import os

DEBUG = True
SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:random_password@postgres/postgres'
APP_DIR = os.path.dirname(os.path.realpath(os.path.join(__file__, '..')))
SITE_WIDTH = 800

# Flask-Security blows up on CSRF tokens on API access
WTF_CSRF_ENABLED = False
