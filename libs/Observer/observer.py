from typing import List
from extensions import db
from models.models import ArticleModel, LastArticleHashModel


class BaseObserver(object):

    def __init__(self, url: str, name: str) -> None:
        self._url = url
        self.__name__ = name

    def get_url(self) -> str:
        return self._url

    def check_for_posts_updates(self):
        raise NotImplementedError

    def get_new_posts(self, articles: List, newest_article_hash: bytes):
        raise NotImplementedError

    def get_newest_article(self, article_context):
        return LastArticleHashModel.query.filter_by(name=article_context).first()

    def update_db_newest_hash(self, article_db_model: ArticleModel):
        last_article = LastArticleHashModel.query.filter_by(name='Niebezpiecznik').first()
        # LastArticleHashDbModel.query.paginate(page=1, per_page=5, error_out=False)
        if last_article:
            last_article.compare_hash = article_db_model.compare_hash
        else:
            last_article = LastArticleHashModel(
                name=article_db_model.name,
                compare_hash=article_db_model.compare_hash
            )
        db.session.add(last_article)

    def update_db_newest_articles(self, articles: List):
        articles.reverse()
        for article in articles:
            article.save()
        self.update_db_newest_hash(articles[-1])
        db.session.commit()
