#!/usr/bin/env bash

chown -R uwsgi:www-data /storage/
exec chpst -u uwsgi:www-data /usr/local/bin/alembic upgrade head
