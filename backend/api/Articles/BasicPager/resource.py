from flask import Response, jsonify
from flask_restful import Resource, request
from werkzeug.exceptions import NotFound

from backend.models.models import ArticleModel


class PaginateArticle(Resource):

    def get(self) -> Response:
        page: int = int(request.args.get('page'))
        try:
            article_models = ArticleModel.query.order_by(ArticleModel.id.desc()).paginate(page=page, per_page=8).items
            return jsonify([article.get_article() for article in article_models])
        except NotFound:
            return jsonify([])