from libs.Article.article import CompareArticleModel
from typing import List


class BaseObserver(object):

    def __init__(self, url: str) -> None:
        self._url = url

    def get_url(self) -> str:
        return self._url

    def check_for_posts_updates(self):
        raise NotImplementedError

    def get_new_posts(self, articles: List):
        raise NotImplementedError

    def update_db_newest_hash(self, newest_hash: bytes):
        raise NotImplementedError

    def update_db_newest_articles(self, articles: List):
        raise NotImplementedError

    def create_article_model_from_compare_article(self, compare_article: CompareArticleModel):
        raise NotImplementedError
