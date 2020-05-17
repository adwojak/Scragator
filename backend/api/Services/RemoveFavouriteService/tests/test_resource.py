from backend.test.base.testing import ResourceTesting
from backend.api.Services.RemoveFavouriteService.resource import RemoveFavouriteService


class TestRemoveFavouriteService(ResourceTesting):
    url: str = '/remove_fav_service'
    resource: RemoveFavouriteService = RemoveFavouriteService

    def test_remove_favourite_service_success(self, app, service):
        super().init(app, fav_service=service)
        response: dict = self.request_post(service)
        self.assert_dicts(response, {'success': True, 'user_fav_services': []})

    def test_add_favourite_service_failure(self, app, service):
        super().init(app)
        response: dict = self.request_post(service)
        self.assert_true(response['error'])
