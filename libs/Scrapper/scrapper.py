from uuid import uuid4

from bs4 import BeautifulSoup
from requests import get as rget


class Scrapper(object):

    default_parser = 'lxml'

    def __init__(self, url, parser_type=default_parser):
        self.url = url
        self.main_soup = self.get_soup_from_link(url, parser_type)
        self.articles = self.get_articles()

    def get_articles(self):
        raise NotImplementedError

    def generate_id(self):
        return uuid4().hex

    def get_response_from_link(self, url):
        return rget(url)

    def get_soup_from_link(self, url, parser_type=default_parser):
        response = self.get_response_from_link(url)
        return BeautifulSoup(response.text, parser_type)
