from flask import jsonify
from flask_restful import Resource
from models import models


class TmpAllResource(Resource):

    def get(self):
        articles = [article.get_article() for article in models.ArticleModel.query.all()]
        return jsonify(len=len(articles), result=articles)
