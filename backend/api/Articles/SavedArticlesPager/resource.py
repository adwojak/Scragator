from flask import Response, jsonify, request
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from backend.services.articles.article import ArticleService
from backend.services.user.user import UserService


class SavedArticlesPager(Resource):

    @jwt_required
    def post(self) -> Response:
        page: int = int(request.form.get('page'))
        article_service: ArticleService = ArticleService()
        user_service: UserService = UserService()

        try:
            user: user_service.model = user_service.get_logged_user()
            favourite_articles: list = user.favourite_articles
            articles: list = article_service.get_items(page, article_service.get_articles_by_ids(favourite_articles))
            return jsonify([article.get_article() for article in articles])
        except:
            return jsonify({
                'error': True
            })
