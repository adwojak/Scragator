from flask import Response, jsonify
from werkzeug.exceptions import NotFound

from backend.services.articles.article import ArticleService
from backend.libs.Resource.FormResource import FormResource
from backend.api.Articles.ServiceFilteredPager.form import ServiceFilteredPagerForm


class FilteredPager(FormResource):
    FORM = ServiceFilteredPagerForm

    def post(self) -> Response:
        article_service: ArticleService = ArticleService()

        try:
            filtered_models: list = article_service.get_items(
                self.form_data['page'],
                article_service.filter_by_service(self.form_data['service']),
                True
            )
            return jsonify([article.get_article() for article in filtered_models])
        except NotFound:
            return jsonify([])
