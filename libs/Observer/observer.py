from typing import List

from extensions import db
from libs.Scrapper.scrapper import Scrapper


class Observer(object):

    def __init__(self, url: str, name: str, scrapper: Scrapper) -> None:
        self._url = url
        self.__name__ = name
        self._scrapper = scrapper

    def get_url(self) -> str:
        return self._url

    def get_scrapper(self) -> Scrapper:
        return self._scrapper

    def update_db_newest_articles(self, articles: List) -> None:
        articles.reverse()
        for article in articles:
            if not article.exist():
                article.save()
        self.commit_db()

    def check_for_posts_updates(self) -> None:
        scrapper: Scrapper = self.get_scrapper()(self.get_url(), self.__name__)
        main_site_articles = scrapper.get_main_site_articles()
        self.update_db_newest_articles(main_site_articles)

    def commit_db(self) -> None:
        db.session.commit()
