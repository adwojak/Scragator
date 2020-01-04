from typing import Any

from bs4 import BeautifulSoup
from requests import get as rget
from requests.models import Response

from backend.models.models import ArticleModel


class Scrapper(object):

    default_parser: str = 'html5lib'

    def __init__(self, url: str, name: str, parser_type: str = default_parser) -> None:
        self.url = url
        self.main_soup = self.get_soup_from_link(url, parser_type)
        self.__name__ = name

    def get_main_site_articles(self) -> None:
        raise NotImplementedError

    def get_response_from_link(self, url: str) -> Response:
        return rget(url)

    def get_soup_from_link(self, url: str, parser_type: str = default_parser) -> BeautifulSoup:
        response = self.get_response_from_link(url)
        return BeautifulSoup(response.text, parser_type)

    def build_article(self, **kwargs: Any) -> ArticleModel:
        return ArticleModel(**kwargs)
