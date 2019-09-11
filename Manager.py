from libs.Observer.observer import BaseObserver
from niebezpiecznik import Niebezpiecznik
from typing import List, Dict
from extensions import db
from models.models import ArticleDbModel


class NiebezpiecznikObserver(BaseObserver):

    def check_for_posts_updates(self) -> None:
        niebezpiecznik = Niebezpiecznik(self.get_url())
        main_site_articles = niebezpiecznik.get_main_site_articles()
        self.update_db_newest_articles(main_site_articles)
        # comparing compare_hash with one saved in db
        # add to db and update latest hashed article in db
        new_main_site_articles = self.get_new_posts(main_site_articles)

    def get_new_posts(self, articles: List) -> List:
        # get latest hash from db and get newest
        # for testing purpose, last 3 posts are new
        return articles[:3]

    def update_db_newest_articles(self, articles):
        db_article_models = [self.article_to_database_model(art) for art in articles[:2]]
        db.session.add(db_article_models)
        db.session.commit()

    def article_to_database_model(self, article):
        return ArticleDbModel(
            article_id=article.get_article_id(),
            title=article.get_title(),
            url=article.get_url(),
            author=article.get_author(),
            upload_date=article.get_upload_date(),
            content='tmpcontent',
            compare_hash=article.get_compare_hash()
        )


class Manager(object):

    observers_dict: Dict = {
        'http://www.niebezpiecznik.pl': NiebezpiecznikObserver
    }

    @property
    def _observers_list(self) -> List:
        return [observer(url) for url, observer in self.observers_dict.items()]

    def execute_observers(self) -> None:
        for observer in self._observers_list:
            observer.check_for_posts_updates()
