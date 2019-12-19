from flask import Response, jsonify, request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from backend.models.models import ArticleModel, UserModel


class SavedArticlesPager(Resource):

    @jwt_required
    def get(self) -> Response:
        page_str: str = request.form.get('page')

        try:
            user: UserModel = UserModel.query.filter_by(email=get_jwt_identity()).first()
            favourite_articles: list = user.favourite_articles
            articles: list = ArticleModel.query.filter(ArticleModel.id.in_(favourite_articles)).paginate(page=int(page_str),
                                                                                                   per_page=8).items
            return jsonify([article.get_article() for article in articles])
        except:
            return jsonify({
                'error': True
            })
