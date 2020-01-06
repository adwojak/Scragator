from copy import deepcopy
from flask import Response, jsonify, request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from backend.models.models import UserModel


class RemoveFavouriteArticle(Resource):

    @jwt_required
    def post(self) -> Response:
        article_id: str = request.form.get('article_id')
        user: UserModel = UserModel.query.filter_by(email=get_jwt_identity()).first()

        if user and article_id and int(article_id) in user.favourite_articles:
            article_id: int = int(article_id)
            user_fav_articles: list = deepcopy(user.favourite_articles)
            user_fav_articles.pop(user_fav_articles.index(article_id))
            user.favourite_articles: list = user_fav_articles
            user.commit_db()
            return jsonify({
                'success': True,
                'user_fav_articles': user_fav_articles
            })
        return jsonify({
            'error': True
        })
