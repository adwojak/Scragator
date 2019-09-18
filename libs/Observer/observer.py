from typing import List
from extensions import db
from models.models import ArticleModel, LastArticleHashModel
from libs.Scrapper.scrapper import Scrapper


class BaseObserver(object):

    def __init__(self, url: str, name: str, scrapper: Scrapper) -> None:
        self._url = url
        self.__name__ = name
        self._scrapper = scrapper

    def get_url(self) -> str:
        return self._url

    def get_scrapper(self):
        return self._scrapper

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

    def check_for_posts_updates(self):
        scrapper = self.get_scrapper()(self.get_url(), self.__name__)
        main_site_articles = scrapper.get_main_site_articles()
        newest_article = self.get_newest_article(self.__name__)
        if newest_article:
            new_posts = self.get_new_posts(main_site_articles, newest_article.compare_hash)
            if new_posts:
                self.update_db_newest_articles(new_posts)
        else:
            self.update_db_newest_articles(main_site_articles)

    def get_new_posts(self, articles: List, newest_article_hash: bytes) -> List:
        new_posts = []
        for article in articles:
            if article.compare_hash == newest_article_hash:
                break
            new_posts.append(article)
        if len(new_posts) == len(articles):
            return []
        return new_posts
