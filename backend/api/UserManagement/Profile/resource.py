from flask import Response, jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from backend.services.user.user import UserService


class Profile(Resource):

    @jwt_required
    def get(self) -> Response:
        user_service: UserService = UserService()

        return jsonify({
            'favourite_articles': user_service.get_fav_articles(),
            'favourite_services': user_service.get_fav_services(),
        })
