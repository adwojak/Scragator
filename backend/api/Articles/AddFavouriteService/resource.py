from flask import Response, jsonify, request
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from backend.services.user.user import UserService


class AddFavouriteService(Resource):

    @jwt_required
    def post(self) -> Response:
        service_name: str = request.form.get('service_name')
        user_service: UserService = UserService()
        user: user_service.model = user_service.get_logged_user()

        if user and service_name and service_name not in user.favourite_services:
            user_service.add_fav_services(service_name)
            return jsonify({
                'success': True,
                'user_fav_services': user.favourite_services
            })
        return jsonify({
            'error': True
        })
