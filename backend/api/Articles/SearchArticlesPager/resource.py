from flask import Response, jsonify
from flask_restful import Resource, request
from werkzeug.exceptions import NotFound

from backend.models.models import ArticleModel


class SearchArticlesPager(Resource):

    def post(self) -> Response:
        page_int: int = request.form.get('page')
        search_string: str = request.form.get('search_string')
        try:
            page: int = int(page_int)
            article_models: list = ArticleModel.query.filter(ArticleModel.title.match(search_string)).paginate(
                page=page, per_page=8).items
            return jsonify([article.get_article() for article in article_models])
        except NotFound:
            return jsonify({
                'error': True
            })
