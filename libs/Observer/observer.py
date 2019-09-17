from typing import List
from extensions import db
from models.models import ArticleDbModel, LastArticleHashDbModel


class BaseObserver(object):

    def __init__(self, url: str) -> None:
        self._url = url

    def get_url(self) -> str:
        return self._url

    def check_for_posts_updates(self):
        raise NotImplementedError

    def get_new_posts(self, articles: List, newest_article_hash: bytes):
        raise NotImplementedError

    def update_db_newest_hash(self, article_db_model: ArticleDbModel):
        last_article = LastArticleHashDbModel.query.filter_by(name='Niebezpiecznik').first()
        if last_article:
            last_article.compare_hash = article_db_model.compare_hash
        else:
            last_article = LastArticleHashDbModel(
                name=article_db_model.name,
                compare_hash=article_db_model.compare_hash
            )
        db.session.add(last_article)

    def update_db_newest_articles(self, articles: List):
        db_article_models = [self.article_to_database_model(art) for art in articles[-2:]]
        for article in db_article_models:
            db.session.add(article)
        self.update_db_newest_hash(db_article_models[0])
        db.session.commit()

    def article_to_database_model(self, article):
        raise NotImplementedError
