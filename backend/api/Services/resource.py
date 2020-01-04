from flask import Response, jsonify
from flask_restful import Resource

from backend.scrappers.names import ScrapperNames


class Services(Resource):

    def get(self) -> Response:
        return jsonify(ScrapperNames.list_values())
