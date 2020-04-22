from flask import Response, jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from backend.scrappers.names import ScrapperNames
from backend.services.user.user import UserService


class SavedServices(Resource):

    @jwt_required
    def get(self) -> Response:
        user_service: UserService = UserService()
        user: user_service.model = user_service.get_logged_user()
        favourite_services: list = user.favourite_services
        return jsonify([ScrapperNames.parse_scrapper(getattr(ScrapperNames, service.upper()).value)
                        for service in favourite_services])
