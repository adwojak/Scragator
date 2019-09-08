from uuid import uuid4

from requests import get as rget

from bs4 import BeautifulSoup


class Scrapper(object):

    default_parser = 'lxml'

    def __init__(self, url, parser_type=default_parser):
        self.url = url
        self.main_soup = self.get_soup_from_link(url, parser_type)

    def get_main_site_articles(self):
        raise NotImplementedError

    def generate_id(self):
        return uuid4().hex

    def get_response_from_link(self, url):
        return rget(url)

    def get_soup_from_link(self, url, parser_type=default_parser):
        response = self.get_response_from_link(url)
        return BeautifulSoup(response.text, parser_type)
