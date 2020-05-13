from flask import Response, jsonify
from werkzeug.exceptions import NotFound

from backend.libs.Forms.forms import PagerForm
from backend.services.articles.article import ArticleService
from backend.libs.Resource.FormResource import FormResource


class PaginateArticle(FormResource):

    FORM = PagerForm

    def post(self) -> Response:
        try:
            article_models: list = ArticleService().get_items(self.form_data['page'], ordered=True)
            return jsonify([article.get_article() for article in article_models])
        except NotFound:
            return jsonify([])
