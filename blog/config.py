import os

DEBUG = True
with open('conf/env') as keyfile:
    # The secret key file is a string in conf/env.  It is gitignored, you
    # must create that file yourself
    SECRET_KEY = keyfile.readline()
SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:random_password@postgres/postgres'
APP_DIR = os.path.dirname(os.path.realpath(os.path.join(__file__, '..')))
SITE_WIDTH = 800
