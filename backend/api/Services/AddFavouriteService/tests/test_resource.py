from backend.test.base.testing import ResourceTesting
from backend.api.Services.AddFavouriteService.resource import AddFavouriteService


class TestRemoveFavouriteService(ResourceTesting):
    url: str = '/remove_fav_service'
    resource: AddFavouriteService = AddFavouriteService

    def test_remove_favourite_service_success(self, app):
        super().init(app)
        response: dict = self.request_post({'service_name': 'ExampleService'})
        self.assert_dicts(response, {'success': True, 'user_fav_services': ['ExampleService']})

    def test_remove_favourite_service_failure(self, app):
        super().init(app)
        self.request_post({'service_name': 'ExampleService'})
        response: dict = self.request_post({'service_name': 'ExampleService'})
        self.assert_true(response['error'])
