from flask import request
from flask_restful import Resource
from werkzeug.datastructures import ImmutableMultiDict


class FormResource(Resource):

    @property
    def FORM(self):
        raise NotImplementedError

    @property
    def form(self):
        return self.FORM(self.correct_request_types(request.json))

    @property
    def is_form_validated(self):
        return self.form.validate()

    @property
    def form_data(self):
        if self.is_form_validated:
            return self.form.data
        return self.form.errors

    def correct_request_types(self, req):
        return ImmutableMultiDict(req)
