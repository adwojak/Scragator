from flask import Response, jsonify
from flask_restful import Resource, request
from werkzeug.exceptions import NotFound

from backend.models.models import ArticleModel


class FilteredPager(Resource):

    def get(self) -> Response:
        page: int = int(request.args.get('page'))
        # services: list = list(request.args.get('service'))

        # try:
            # filtered_models = ArticleModel.query.order_by(ArticleModel.id.desc()).filter(
            #     ArticleModel.name.in_(services)).paginate(page=page, per_page=8).items
            # return jsonify([article.get_article() for article in filtered_models])
        # except NotFound:
        #     return jsonify([])
        # except TypeError:
        #     return jsonify([{'elo': 12}])
        return jsonify([])
