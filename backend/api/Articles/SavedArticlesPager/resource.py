from flask import Response, jsonify
from flask_jwt_extended import jwt_required
from werkzeug.exceptions import NotFound

from backend.libs.Forms.forms import PagerForm
from backend.services.user.user import UserService
from backend.services.articles.article import ArticleService
from backend.libs.Resource.FormResource import FormResource


class SavedArticlesPager(FormResource):
    FORM = PagerForm

    @jwt_required
    def post(self) -> Response:
        article_service: ArticleService = ArticleService()
        user_service: UserService = UserService()

        try:
            user: user_service.model = user_service.get_logged_user()
            favourite_articles: list = user.favourite_articles
            articles: list = article_service.get_items(self.form_data['page'],
                                                       article_service.get_articles_by_ids(favourite_articles))
            return jsonify([article.get_article() for article in articles])
        except NotFound:
            return jsonify([])
