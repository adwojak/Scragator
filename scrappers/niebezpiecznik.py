from datetime import datetime

from models.models import ArticleModel
from libs.Scrapper.scrapper import Scrapper
from typing import List
from bs4.element import Tag
from string import whitespace


class Niebezpiecznik(Scrapper):

    def get_main_site_articles(self) -> List:
        main_site_articles = []
        all_main_site_posts = self.main_soup.find_all('div', {'class': 'post'})
        for post in all_main_site_posts:

            post_container_title = post.find('div', {'class': 'title'}).find('h2').find('a')
            post_container_postmeta = post.find('div', {'class': 'postmeta'})

            main_site_articles.append(ArticleModel(
                name=self.__name__,
                title=self.get_title(post_container_title),
                url=self.get_url(post_container_title),
                author=self.get_author(post_container_postmeta),
                upload_date=self.get_date_from_main_site_post(post),
            ))
        return main_site_articles

    def get_date_from_main_site_post(self, post: Tag) -> datetime:
        post_date = post.find('div', {'class': 'date'})
        return self.get_date_as_datetime(post_date.get_text(), 'T%H:%MT%d.%m.%Y')

    def get_date_as_datetime(self, date: str, date_format: str = 'T%H:%MT%d/%m/%Y') -> datetime:
        date_unformatted = date.replace('\n', 'T').translate(str.maketrans('', '', whitespace))
        return datetime.strptime(date_unformatted, date_format)

    def get_author(self, author: Tag) -> str:
        author_raw = author.get_text().split('\n')[1]
        return author_raw.split('Autor:')[1].split('|')[0].strip()

    def get_url(self, post_link):
        return post_link['href']

    def get_title(self, post_title):
        return post_title.text
