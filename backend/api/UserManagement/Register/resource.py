from flask import Response, jsonify
from flask_restful import request

from backend.models.models import UserModel
from backend.extensions import db
from backend.libs.Resource.AuthResource import AuthResource
from backend.api.UserManagement.Register.form import RegisterForm


class RegisterUser(AuthResource):

    def post(self) -> Response:

        form: RegisterForm = RegisterForm(request.form)

        if form.validate():
            email: str = form.email.data
            user: UserModel = UserModel.query.filter_by(email=email).first()
            if user:
                return jsonify({
                    'user_exists': True
                })

            try:
                hashed_password: str = self.hash_password(form.password.data)
                new_user: UserModel = UserModel(email=email, password=hashed_password)
                db.session.add(new_user)
                db.session.commit()
                return jsonify({
                    'created': True
                })
            except:  # TODO Errors handling
                return jsonify({
                    'error': True
                })
        else:
            return jsonify(form.errors)
