from uuid import uuid4

from requests import get as rget
from requests.models import Response

from bs4 import BeautifulSoup


class Scrapper(object):

    default_parser: str = 'lxml'

    def __init__(self, url: str, parser_type: str = default_parser) -> None:
        self.url = url
        self.main_soup = self.get_soup_from_link(url, parser_type)

    def get_main_site_articles(self):
        raise NotImplementedError

    def generate_id(self) -> str:
        return uuid4().hex

    def get_response_from_link(self, url: str) -> Response:
        return rget(url)

    def get_soup_from_link(self, url: str, parser_type: str = default_parser) -> BeautifulSoup:
        response = self.get_response_from_link(url)
        return BeautifulSoup(response.text, parser_type)
