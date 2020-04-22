from flask import Response, jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from backend.services.user.user import UserService


class Profile(Resource):

    @jwt_required
    def get(self) -> Response:
        user_service: UserService = UserService()
        user: user_service.model = user_service.get_logged_user()

        if user:
            return jsonify({
                'favourite_articles': user.favourite_articles,
                'favourite_services': user.favourite_services,
            })
        return jsonify({
            'error': True
        })
