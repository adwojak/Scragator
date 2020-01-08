from flask import Response, jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from backend.models.models import UserModel
from backend.scrappers.names import ScrapperNames


class SavedServices(Resource):

    @jwt_required
    def get(self) -> Response:
        user: UserModel = UserModel.query.filter_by(email=get_jwt_identity()).first()
        favourite_services: list = user.favourite_services
        return jsonify([ScrapperNames.parse_scrapper(getattr(ScrapperNames, service.upper()).value)
                        for service in favourite_services])
