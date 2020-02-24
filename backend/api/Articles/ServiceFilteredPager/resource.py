from flask import Response, jsonify
from flask_restful import Resource, request
from werkzeug.exceptions import NotFound

from backend.models.models import ArticleModel


class FilteredPager(Resource):

    def post(self) -> Response:
        page_str: str = request.form.get('page')
        service: str = request.form.get('service')

        try:
            page: int = int(page_str)
            filtered_models: list = ArticleModel.query.order_by(ArticleModel.id.desc())\
                .filter(ArticleModel.name.match(service)).paginate(page=page, per_page=8).items
            return jsonify([article.get_article() for article in filtered_models])
        except NotFound:
            return jsonify([])
        except TypeError:
            return jsonify([])
