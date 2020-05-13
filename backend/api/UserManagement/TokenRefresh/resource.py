from flask import Response, jsonify
from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity, create_access_token, jwt_refresh_token_required


class TokenRefresh(Resource):

    @jwt_refresh_token_required
    def post(self) -> Response:
        current_user: str = get_jwt_identity()
        return jsonify({
            'access_token': create_access_token(identity=current_user)
        })
