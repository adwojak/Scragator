from libs.Observer.observer import BaseObserver
from niebezpiecznik import Niebezpiecznik
from typing import List, Dict
from models.models import ArticleDbModel, LastArticleHashDbModel


class NiebezpiecznikObserver(BaseObserver):

    def check_for_posts_updates(self) -> None:
        niebezpiecznik = Niebezpiecznik(self.get_url())
        main_site_articles = niebezpiecznik.get_main_site_articles()
        newest_article = LastArticleHashDbModel.query.filter_by(name=Niebezpiecznik.__name__).first()
        if newest_article:
            new_posts = self.get_new_posts(main_site_articles, newest_article.compare_hash)
            self.update_db_newest_articles(new_posts)
        else:
            self.update_db_newest_articles(main_site_articles)

    def get_new_posts(self, articles: List, newest_article_hash: bytes) -> List:
        new_posts = []
        for article in articles:
            if article.get_compare_hash() == newest_article_hash:
                break
            new_posts.append(article)
        return new_posts

    def article_to_database_model(self, article):
        return ArticleDbModel(
            article_id=article.get_article_id(),
            name=article.get_name(),
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
