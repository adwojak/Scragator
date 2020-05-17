from backend.test.base.testing import ResourceTesting
from backend.api.Articles.SavedArticlesPager.resource import SavedArticlesPager


class TestSavedArticlesPager(ResourceTesting):
    url: str = '/saved_articles'
    resource: SavedArticlesPager = SavedArticlesPager

    def test_saved_articles_pager(self, app, article, article_dict):
        super().init(app, db_commit=article, fav_article=article_dict)
        response: dict = self.request_post({'page': 1})
        self.assert_match(response, [{
            'author': 'Article author',
            'hash': 'TklFQkVaUElFQ1pOSUstMjAyMC0wNC0yMiAxMTozMTowMC1BcnRpY2xlIGF1dGhvci1hcnRpY2xldXJsLmNvbS9hc2Q=',
            'id': 1, 'name': 'NIEBEZPIECZNIK', 'title': 'Article title',
            'upload_date': 'Wed, 22 Apr 2020 11:31:00 GMT', 'url': 'articleurl.com/asd'
        }])

    def test_saved_articles_pager_empty(self, app):
        super().init(app)
        response: dict = self.request_post({'page': 1})
        self.assert_match(response, [])

    def test_saved_articles_pager_not_found(self, app):
        super().init(app)
        response: dict = self.request_post({'page': 2})
        self.assert_match(response, [])
