from flask import jsonify
from flask_restful import Resource
from scrappers.names import ScrapperNames


class Services(Resource):

    def get(self):
        return jsonify(ScrapperNames.list_values())
