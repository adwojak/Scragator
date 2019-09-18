from flask import Flask, jsonify

from config import Config
from extensions import db, migrate
from models import models
from Manager import Manager


def create_app() -> Flask:
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    migrate.init_app(app, db)

    @app.route('/')
    def hello():
        Manager().execute_observers()
        return 'aa'

    @app.route('/all')
    def all():
        articles = [article.get_article() for article in models.ArticleModel.query.all()]
        return jsonify(result=articles)

    return app
