from copy import deepcopy
from flask import Response, jsonify, request
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from backend.services.user.user import UserService


class RemoveFavouriteArticle(Resource):

    @jwt_required
    def post(self) -> Response:
        article_id: str = request.form.get('article_id')
        user_service: UserService = UserService()
        user: user_service.model = user_service.get_logged_user()

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
