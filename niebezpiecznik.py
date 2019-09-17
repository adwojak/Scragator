from datetime import datetime

from libs.Article.article import ArticleModel
from libs.Scrapper.scrapper import Scrapper
from typing import List
from bs4 import BeautifulSoup
from bs4.element import Tag
from string import whitespace


class Niebezpiecznik(Scrapper):

    __name__ = 'Niebezpiecznik'

    def get_main_site_articles(self) -> List:
        main_site_articles = []
        all_main_site_posts = self.main_soup.find_all('div', {'class': 'post'})
        for post in all_main_site_posts:
            post_h2 = post.find('h2')
            post_link = post_h2.find('a', {'rel': 'bookmark'})
            main_site_articles.append(ArticleModel(
                article_id=self.generate_id(),
                name=self.__name__,
                title=post_link['title'],
                url=post_link['href'],
                author=self.get_author(
                    post.find('div', {'class': 'postmeta'})),
                upload_date=self.get_date_from_main_site_post(
                    post.find('div', {'class': 'date'}))
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
