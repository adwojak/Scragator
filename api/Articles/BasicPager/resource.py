from flask import jsonify
from flask_restful import Resource
from models.models import ArticleModel


class PaginateArticle(Resource):

    def get(self, page=1):
        article_models = ArticleModel.query.paginate(page=page, per_page=8).items
        return jsonify([article.get_article() for article in article_models])
