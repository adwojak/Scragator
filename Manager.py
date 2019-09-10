from libs.Observer.observer import BaseObserver
from niebezpiecznik import Niebezpiecznik
from typing import List, Dict


class NiebezpiecznikObserver(BaseObserver):

    def check_for_posts_updates(self) -> None:
        niebezpiecznik = Niebezpiecznik(self.get_url())
        main_site_articles = niebezpiecznik.get_main_site_articles()
        # comparing compare_hash with one saved in db
        # if there is something new, create ArticleModel from CompareArticleModel
        # add to db and update latest hashed article in db
        new_main_site_articles = self.get_new_posts(main_site_articles)
        # create article from base article
        # self.create_article_model_from_compare_article()

        # import pdb;pdb.set_trace()

    def get_new_posts(self, articles: List) -> List:
        # get latest hash from db and get newest
        # for testing purpose, last 3 posts are new
        return articles[:3]


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
