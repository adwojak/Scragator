import pdb
from datetime import datetime

from article import ArticleModel
from scrapper import Scrapper


class Niebezpiecznik(Scrapper):

    def get_articles(self):
        posts_from_main_site = self.get_main_site_posts()
        complete_post = self.get_posts_from_links(posts_from_main_site)
        return [ArticleModel(
            id=post['id'],
            title=post['title'],
            url=post['href'],
            author=post.get('author'),
            upload_date=post.get('date'),
            content=post.get('content')
        ) for post in complete_post]

    def format_title_site_posts(self, href):
        return {
            'id': self.generate_id(),
            'href': href,
        }

    def get_main_site_posts(self):
        all_posts = self.main_soup.find_all('div', {'class': 'post'})
        all_posts_titles = [
            post.find('div', {'class': 'title'}) for post in all_posts]
        all_posts_titles_links = [
            self.format_title_site_posts(title.find('h2').find('a')['href']) for title in all_posts_titles
        ]
        return all_posts_titles_links

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

    def get_posts_from_links(self, links):
        complete_posts = []
        for link in links:
            soup = self.get_soup_from_link(link['href'])
            post = self.get_post_from_soup(soup)
            link.update(post)
            complete_posts.append(link)
        return complete_posts


url = 'http://www.niebezpiecznik.pl'

nieb = Niebezpiecznik(url)
title_posts_links = nieb.get_main_site_posts()

pdb.set_trace()
