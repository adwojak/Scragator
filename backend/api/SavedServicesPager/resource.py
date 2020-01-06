from flask import Response, jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from backend.models.models import UserModel


class SavedServices(Resource):

    @jwt_required
    def get(self) -> Response:
        user: UserModel = UserModel.query.filter_by(email=get_jwt_identity()).first()
        favourite_services: list = user.favourite_services
        return jsonify(favourite_services)
