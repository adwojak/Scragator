from flask import Response, jsonify
from flask_restful import Resource, request
from werkzeug.exceptions import NotFound

from backend.models.models import ArticleModel


class PaginateArticle(Resource):

    def get(self) -> Response:
        page_int: int = request.form.get('page')
        try:
            page: int = int(page_int)
            article_models: list = ArticleModel.query.order_by(ArticleModel.id.desc()).paginate(page=page, per_page=8).items
            return jsonify([article.get_article() for article in article_models])
        except NotFound:
            return jsonify([])
