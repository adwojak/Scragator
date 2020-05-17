from backend.test.base.testing import ResourceTesting
from backend.api.Articles.RemoveFavouriteArticle.resource import RemoveFavouriteArticle


class TestRemoveFavouriteArticle(ResourceTesting):
    url: str = '/remove_fav_article'
    resource: RemoveFavouriteArticle = RemoveFavouriteArticle

    def test_remove_favourite_article_success(self, app, article, article_dict):
        super().init(app, db_commit=article, fav_article=article_dict)
        response: dict = self.request_post(article_dict)
        self.assert_dicts(response, {'success': True, 'user_fav_articles': []})

    def test_remove_favourite_article_failure(self, app, article, article_dict):
        super().init(app, db_commit=article)
        response: dict = self.request_post(article_dict)
        self.assert_true(response['error'])
