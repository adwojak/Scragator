from flask import Response, jsonify
from flask_jwt_extended import jwt_required

from backend.services.user.user import UserService
from backend.libs.Resource.FormResource import FormResource
from backend.api.Services.RemoveFavouriteService.form import RemoveFavouriteServiceForm


class RemoveFavouriteService(FormResource):

    FORM = RemoveFavouriteServiceForm

    @jwt_required
    def post(self) -> Response:
        service_name: str = self.form_data['service_name']
        user_service: UserService = UserService()
        user: user_service.model = user_service.get_logged_user()

        if user and service_name in user.favourite_services:
            user_service.remove_fav_services(service_name)
            return jsonify({
                'success': True,
                'user_fav_services': user.favourite_services
            })
        return jsonify({
            'error': True
        })
