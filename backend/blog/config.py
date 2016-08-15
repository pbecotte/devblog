import os

DEBUG = True
SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:random_password@postgres/postgres'
APP_DIR = os.path.dirname(os.path.realpath(os.path.join(__file__, '..')))
SITE_WIDTH = 800

SECURITY_LOGIN_URL = '/login'  # this is not reachable... overriden in views.py
SECURITY_LOGOUT_URL = '/api/logout'
# Flask-Security blows up on CSRF tokens on API access
WTF_CSRF_ENABLED = False
