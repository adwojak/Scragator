from pytest import raises

from backend.test.base.testing import TestingBase
from backend.libs.Scrapper.scrapper import Scrapper


class TestScrapper(TestingBase):

    def test_get_main_site_articles_not_implemented(self):
        with raises(NotImplementedError):
            Scrapper('https://www.example.com/', 'name').get_main_site_articles()
