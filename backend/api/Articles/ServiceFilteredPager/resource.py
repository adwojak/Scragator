from flask import Response, jsonify
from flask_restful import Resource, request
from werkzeug.exceptions import NotFound

from backend.services.articles.article import ArticleService


class FilteredPager(Resource):

    def post(self) -> Response:
        page_str: str = request.form.get('page')
        service: str = request.form.get('service')
        article_service: ArticleService = ArticleService()

        try:
            page: int = int(page_str)
            filtered_models: list = article_service.get_items(page, article_service.filter_by_service(service), True)
            return jsonify([article.get_article() for article in filtered_models])
        except NotFound:
            return jsonify([])
        except TypeError:
            return jsonify([])
