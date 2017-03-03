from datetime import datetime

from flask import Blueprint, current_app, jsonify, request
from flask.ext.security import current_user, login_required, roles_accepted
from marshmallow import fields, post_load, Schema, ValidationError

from blog.orm import db
from blog.status_day.models import StatusDay


STATUS_DAY_API = Blueprint('status_day_api', __name__)


class StatusDaySchema(Schema):
    date = fields.DateTime(format="%m-%d")
    status = fields.Str()


def return_10_days():
    # Fetch the most recent 10 status days
    status_days = (StatusDay.query
                   .order_by(StatusDay.date.desc())
                   .limit(10)
                   .all()
                   )
    data = StatusDaySchema(many=True).dump(status_days).data
    return jsonify(data=data)


@STATUS_DAY_API.route('/api/status_day/')
@roles_accepted('admin', 'status')
def api_status_day():
    return return_10_days()


@STATUS_DAY_API.route('/api/status_day/<datestring>/', methods=['POST'])
@roles_accepted('admin', 'status')
def api_status_day_update(datestring):
    day = datetime.strptime('2017-%s' % datestring, "%Y-%m-%d")
    status = request.json['status']
    obj = StatusDay.query.get(day)
    if obj:
        obj.status = status
    else:
        db.session.add(StatusDay(date=day, status=status))
    db.session.commit()

    return return_10_days()
