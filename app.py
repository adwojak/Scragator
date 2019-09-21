from flask import Flask, jsonify

from config import Config
from extensions import db, migrate, scheduler
from Manager import Manager
from models import models


def create_app() -> Flask:
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    db.app = app
    migrate.init_app(app, db)

    scheduler.init_app(app)
    scheduler.start()

    @app.route('/')
    def hello():
        Manager().execute_observers()
        return 'aa'

    @app.route('/all')
    def all():
        articles = [article.get_article() for article in models.ArticleModel.query.all()]
        return jsonify(len=len(articles), result=articles)

    return app
