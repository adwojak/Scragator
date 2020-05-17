from backend.test.base.testing import ResourceTesting
from backend.api.Articles.ServiceFilteredPager.resource import FilteredPager


class TestFilterArticlesPager(ResourceTesting):
    url: str = '/service_articles'
    resource: FilteredPager = FilteredPager

    def test_filter_articles_pager(self, app, article):
        super().init(app, db_commit=article)
        response: dict = self.request_post({'page': 1, 'service': 'Niebezpiecznik'})
        self.assert_match(response, [{
            'author': 'Article author',
            'hash': 'TklFQkVaUElFQ1pOSUstMjAyMC0wNC0yMiAxMTozMTowMC1BcnRpY2xlIGF1dGhvci1hcnRpY2xldXJsLmNvbS9hc2Q=',
            'id': 1, 'name': 'NIEBEZPIECZNIK', 'title': 'Article title',
            'upload_date': 'Wed, 22 Apr 2020 11:31:00 GMT', 'url': 'articleurl.com/asd'
        }])

    def test_saved_articles_pager_empty(self, app):
        super().init(app)
        response: dict = self.request_post({'page': 1, 'service': 'Bezpiecznik'})
        self.assert_match(response, [])

    def test_saved_articles_pager_not_found(self, app):
        super().init(app)
        response: dict = self.request_post({'page': 2, 'service': 'Bezpiecznik'})
        self.assert_match(response, [])
