from ast import literal_eval
from flask import Response, jsonify
from flask_restful import Resource, request
from werkzeug.exceptions import NotFound

from backend.models.models import ArticleModel


class FilteredPager(Resource):

    def get(self) -> Response:
        page_str: str = request.form.get('page')
        services_str: str = request.form.get('services')

        try:
            page: int = int(page_str)
            services: list = literal_eval(services_str)
            filtered_models: list = ArticleModel.query.order_by(ArticleModel.id.desc()).filter(
                ArticleModel.name.in_(services)).paginate(page=page, per_page=8).items
            return jsonify([article.get_article() for article in filtered_models])
        except NotFound:
            return jsonify([])
        except TypeError:
            return jsonify([])
