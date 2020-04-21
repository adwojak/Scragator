from flask import Response, jsonify, request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from backend.models.models import UserModel
from backend.services.articles.article import ArticleService


class SavedArticlesPager(Resource):

    @jwt_required
    def post(self) -> Response:
        page: str = int(request.form.get('page'))
        article_service = ArticleService()

        try:
            user: UserModel = UserModel.query.filter_by(email=get_jwt_identity()).first()
            favourite_articles: list = user.favourite_articles
            articles: list = article_service.get_items(page, article_service.get_articles_by_ids(favourite_articles))
            return jsonify([article.get_article() for article in articles])
        except:
            return jsonify({
                'error': True
            })
