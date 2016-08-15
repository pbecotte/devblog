from flask import Flask, render_template
import urllib

from blog.orm import db
from blog.security import security, jwt
from blog.entry import entry
from blog.entry.api import ENTRY_API


def create_app():
    # Create app
    app = Flask(__name__)
    app.config.from_object('blog.config')
    app.config.from_object('blog.secrets')
    db.init_app(app)
    security.init_app(app)
    jwt.init_app(app)
    app.register_blueprint(entry)
    app.register_blueprint(ENTRY_API)

    @app.errorhandler(404)
    def not_found(exc):
        message = 'Sorry!  The Resource could not be found'
        return render_template('error.html', title='404', message=message), 404

    @app.errorhandler(403)
    def not_authorized(exc):
        message = 'You do not have permission to access that page'
        return render_template('error.html', title='403', message=message), 403

    @app.template_filter('clean_querystring')
    def clean_querystring(request_args, *keys_to_remove, **new_values):
        # We'll use this template filter in the pagination include. This filter
        # will take the current URL and allow us to preserve the arguments in the
        # querystring while replacing any that we need to overwrite. For instance
        # if your URL is /?q=search+query&page=2 and we want to preserve the search
        # term but make a link to page 3, this filter will allow us to do that.
        querystring = dict((key, value) for key, value in request_args.items())
        for key in keys_to_remove:
            querystring.pop(key, None)
        querystring.update(new_values)
        return urllib.urlencode(querystring)

    return app


def main():
    app = create_app()
    app.run()


if __name__ == '__main__':
    main()
