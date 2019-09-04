from datetime import datetime

from libs.Article.article import ArticleModel
from libs.Scrapper.scrapper import Scrapper


class Niebezpiecznik(Scrapper):

    def get_articles(self):
        return self.get_main_site_posts()

    def get_main_site_posts(self):
        articles = []
        all_posts = self.main_soup.find_all('div', {'class': 'post'})

        for post in all_posts:
            post_h2 = post.find('h2')
            post_link = post_h2.find('a', {'rel': 'bookmark'})['href']
            full_post = self.get_post_from_link(post_link)
            articles.append(ArticleModel(
                id=self.generate_id(),
                title=full_post['title'],
                url=post_link,
                author=full_post.get('author'),
                upload_date=full_post.get('upload_date'),
                content=full_post.get('content')
            ))

        return articles

    def get_date_as_datetime(self, date):
        date_unformatted = date.replace('\n', 'T')
        return datetime.strptime(date_unformatted, 'T%H:%MT%d/%m/%Y ')

    def get_title(self, title):
        return title.find('a').get_text()

    def get_author(self, author):
        author_raw = author.get_text().split('\n')[1]
        return author_raw.split('Autor:')[1].split('|')[0].strip()

    def get_entry(self, entry):
        return entry

    def get_post_from_soup(self, soup):
        post_container = soup.find('div', {'class': 'post'})
        title_author_container = post_container.find('div', {'class': 'title'})

        date = self.get_date_as_datetime(
            post_container.find('div', {'class': 'date'}).get_text())
        title = self.get_title(title_author_container.find('h2'))
        author = self.get_author(
            title_author_container.find('div', {'class': 'postmeta'}))
        content = self.get_entry(
            post_container.find('div', {'class': 'entry'}))
        return {
            'date': date,
            'title': title,
            'author': author,
            'content': content
        }

    def get_post_from_link(self, link):
        soup = self.get_soup_from_link(link)
        return self.get_post_from_soup(soup)


url = 'http://www.niebezpiecznik.pl'

nieb = Niebezpiecznik(url)
