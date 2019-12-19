from flask import Response, jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from backend.models.models import UserModel


class Profile(Resource):

    @jwt_required
    def get(self) -> Response:
        user: UserModel = UserModel.query.filter_by(email=get_jwt_identity()).first()

        if user:
            return jsonify({
                'favourite_articles': user.favourite_articles,
                'favourite_services': user.favourite_services,
            })
        return jsonify({
            'error': True
        })
