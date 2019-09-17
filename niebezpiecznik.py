from datetime import datetime

from models.models import ArticleModel
from libs.Scrapper.scrapper import Scrapper
from typing import List
from bs4 import BeautifulSoup
from bs4.element import Tag
from string import whitespace
from libs.Observer.observer import BaseObserver


class NiebezpiecznikObserver(BaseObserver):

    def check_for_posts_updates(self) -> None:
        niebezpiecznik = Niebezpiecznik(self.get_url(), self.__name__)
        main_site_articles = niebezpiecznik.get_main_site_articles()
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


class Niebezpiecznik(Scrapper):

    def get_main_site_articles(self) -> List:
        main_site_articles = []
        all_main_site_posts = self.main_soup.find_all('div', {'class': 'post'})
        for post in all_main_site_posts:
            post_h2 = post.find('h2')
            post_link = post_h2.find('a', {'rel': 'bookmark'})
            main_site_articles.append(ArticleModel(
                name=self.__name__,
                title=post_link['title'],
                url=post_link['href'],
                author=self.get_author(post.find('div', {'class': 'postmeta'})),
                upload_date=self.get_date_from_main_site_post(post.find('div', {'class': 'date'})),
                content='tmpcontent'
            ))
        return main_site_articles

    def get_date_from_main_site_post(self, upload_date: Tag) -> datetime:
        return self.get_date_as_datetime(upload_date.get_text(), 'T%H:%MT%d.%m.%Y')

    def get_date_as_datetime(self, date: str, date_format: str = 'T%H:%MT%d/%m/%Y') -> datetime:
        date_unformatted = date.replace('\n', 'T').translate(str.maketrans('', '', whitespace))
        return datetime.strptime(date_unformatted, date_format)

    def get_author(self, author: Tag) -> str:
        author_raw = author.get_text().split('\n')[1]
        return author_raw.split('Autor:')[1].split('|')[0].strip()

    def get_post_from_link(self, link: str) -> BeautifulSoup:
        soup = self.get_soup_from_link(link)
        return soup
