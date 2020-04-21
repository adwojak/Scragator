from flask import Response, jsonify
from flask_restful import Resource, request
from werkzeug.exceptions import NotFound

from backend.services.articles.article import ArticleService


class SearchArticlesPager(Resource):

    def post(self) -> Response:
        page_int: int = request.form.get('page')
        search_string: str = request.form.get('search_string')
        article_service = ArticleService()

        try:
            page: int = int(page_int)
            articles: list = article_service.get_items(page, article_service.filter_by_title(search_string))
            return jsonify([article.get_article() for article in articles])
        except NotFound:
            return jsonify({
                'error': True
            })
