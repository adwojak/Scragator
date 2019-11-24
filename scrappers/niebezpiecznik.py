from datetime import datetime
from string import whitespace

from bs4.element import Tag

from libs.Scrapper.scrapper import Scrapper


class Niebezpiecznik(Scrapper):

    def get_main_site_articles(self) -> list:
        main_site_articles: list = []
        all_main_site_posts: Tag = self.main_soup.find_all('div', {'class': 'post'})
        for post in all_main_site_posts:

            post_container_title: Tag = post.find('div', {'class': 'title'}).find('h2').find('a')
            post_container_postmeta: Tag = post.find('div', {'class': 'postmeta'})

            main_site_articles.append(self.build_article(
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

    def get_url(self, post_link: Tag) -> str:
        return post_link['href']

    def get_title(self, post_title: Tag) -> str:
        return post_title.text
