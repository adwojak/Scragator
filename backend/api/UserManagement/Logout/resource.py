from flask import jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required, jwt_refresh_token_required, get_raw_jwt

from backend.models.models import RevokedTokenModel


class AccessTokenLogout(Resource):

    @jwt_required
    def post(self):
        try:
            jti = get_raw_jwt()['jti']
            revoked_token = RevokedTokenModel(jti=jti)
            revoked_token.add()
            return jsonify({
                'access_token_logout': True
            })
        except:
            return jsonify({
                'access_token_logout': False
            })


class RefreshTokenLogout(Resource):

    @jwt_refresh_token_required
    def post(self):
        try:
            jti = get_raw_jwt()['jti']
            revoked_token = RevokedTokenModel(jti=jti)
            revoked_token.add()
            return jsonify({
                'refresh_token_logout': True
            })
        except:
            return jsonify({
                'refresh_token_logout': False
            })
