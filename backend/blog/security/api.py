from flask import Blueprint, jsonify, request
from werkzeug.datastructures import MultiDict
from flask_security import login_user
from flask_security.views import after_this_request, _commit
from flask_security.forms import LoginForm, RegisterForm, Required
from flask_security.registerable import register_user
from wtforms import StringField

SECURITY_API = Blueprint('security_api', __name__)


def render_json(form, include_user=True, include_auth_token=False):
    has_errors = len(form.errors) > 0

    if has_errors:
        code = 400
        response = dict(errors=form.errors)
    else:
        code = 200
        response = dict()
        if include_user:
            response['user'] = dict(
                id=str(form.user.id),
                admin='admin' in form.user.roles,
                status_user='status' in form.user.roles
            )
        if include_auth_token:
            token = form.user.get_auth_token()
            response['user']['authentication_token'] = token

    return jsonify(dict(meta=dict(code=code), response=response))


@SECURITY_API.route('/api/login', methods=['POST'])
def login():
    """View function for login view"""

    form = LoginForm(MultiDict(request.json))

    if form.validate_on_submit():
        login_user(form.user, remember=form.remember.data)
        after_this_request(_commit)

    if request.json:
        return render_json(form, include_auth_token=True)


class ExtendedRegisterForm(RegisterForm):
    alias = StringField('alias', [Required()])


@SECURITY_API.route('/api/register', methods=['POST'])
def register():
    """View function which handles a registration request."""

    form = ExtendedRegisterForm(MultiDict(request.json))
    if form.validate_on_submit():
        user = register_user(**form.to_dict())
        form.user = user
        after_this_request(_commit)
        login_user(user)

        return render_json(form, include_auth_token=True)
    return render_json(form)
