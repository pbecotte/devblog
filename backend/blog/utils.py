from flask import request, abort, jsonify, render_template
from flask.ext.sqlalchemy import BaseQuery
import math


class PaginatedQuery(object):
    def __init__(self, query_or_model, paginate_by, page_var='page',
                 check_bounds=False):
        self.paginate_by = paginate_by
        self.page_var = page_var
        self.check_bounds = check_bounds

        if isinstance(query_or_model, BaseQuery):
            self.query = query_or_model
        else:
            self.model = query_or_model
            self.query = self.model.all()

    def get_page(self):
        curr_page = request.args.get(self.page_var)
        if curr_page and curr_page.isdigit():
            return max(1, int(curr_page))
        return 1

    def get_page_count(self):
        return int(math.ceil(float(self.query.count()) / self.paginate_by))

    def get_object_list(self):
        if self.get_page_count() == 0:
            return []
        if self.check_bounds and self.get_page() > self.get_page_count():
            abort(404)

        return self.query.paginate(self.get_page(), self.paginate_by).items


def object_list(template_name, query, context_variable='object_list',
                paginate_by=20, page_var='page', check_bounds=True, **kwargs):
    paginated_query = PaginatedQuery(
        query,
        paginate_by,
        page_var,
        check_bounds)
    kwargs[context_variable] = paginated_query.get_object_list()
    return render_template(
        template_name,
        pagination=paginated_query,
        page=paginated_query.get_page(),
        **kwargs)


def json_object_list(query, context_variable='object_list',
                paginate_by=20, page_var='page', check_bounds=True, **kwargs):
    paginated_query = PaginatedQuery(
        query,
        paginate_by,
        page_var,
        check_bounds)
    kwargs[context_variable] = paginated_query.get_object_list()
    return jsonify(
        pagination=paginated_query,
        page=paginated_query.get_page(),
        **kwargs)


def get_object_or_404(query, criteria):
    q = query.filter(criteria)
    if q.first():
        return q.first()
    else:
        abort(404)
