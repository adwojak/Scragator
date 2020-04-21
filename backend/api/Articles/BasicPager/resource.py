from flask import Response, jsonify
from flask_restful import Resource, request
from werkzeug.exceptions import NotFound

from backend.services.articles.article import ArticleService


class PaginateArticle(Resource):

    def post(self) -> Response:
        page_int: int = request.form.get('page')
        try:
            page: int = int(page_int)
            article_models: list = ArticleService().get_items(page, ordered=True)
            return jsonify([article.get_article() for article in article_models])
        except NotFound:
            return jsonify([])
