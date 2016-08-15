from flask import Blueprint, request
from werkzeug.datastructures import MultiDict
from flask_security import login_user
from flask_security.views import after_this_request, _commit, _render_json
from flask_security.forms import LoginForm


SECURITY_API = Blueprint('security_api', __name__)


@SECURITY_API.route('/api/login', methods=['POST'])
def login():
    """View function for login view"""

    form = LoginForm(MultiDict(request.json))

    if form.validate_on_submit():
        login_user(form.user, remember=form.remember.data)
        after_this_request(_commit)

    if request.json:
        return _render_json(form, include_auth_token=True)
