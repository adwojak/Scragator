from backend.test.base.testing import ResourceTesting
from backend.api.Services.AddFavouriteService.resource import AddFavouriteService


class TestAddFavouriteService(ResourceTesting):
    url: str = '/add_fav_service'
    resource: AddFavouriteService = AddFavouriteService

    def test_add_favourite_service_success(self, app, service):
        super().init(app)
        response: dict = self.request_post(service)
        self.assert_dicts(response, {'success': True, 'user_fav_services': ['ExampleService']})

    def test_add_favourite_service_failure(self, app, service):
        super().init(app)
        self.request_post(service)
        response: dict = self.request_post(service)
        self.assert_true(response['error'])
