from flask import Response, jsonify
from werkzeug.exceptions import NotFound

from backend.services.articles.article import ArticleService
from backend.libs.Resource.FormResource import FormResource
from backend.api.Articles.SearchArticlesPager.form import SearchArticlesPagerForm


class SearchArticlesPager(FormResource):

    FORM = SearchArticlesPagerForm

    def post(self) -> Response:
        article_service = ArticleService()

        try:
            articles: list = article_service.get_items(self.form_data['page'],
                                                       article_service.filter_by_title(self.form_data['search_string']))
            return jsonify([article.get_article() for article in articles])
        except NotFound:
            return jsonify([])
