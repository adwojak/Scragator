from backend.test.base.testing import ResourceTesting
from backend.api.Services.ListServices.resource import Services


class TestListServices(ResourceTesting):
    url: str = '/services'
    resource: Services = Services

    def test_list_services(self, app):
        super().init(app)
        response: list = self.request_get()
        self.assert_match(response, [{'img': 'https://pbs.twimg.com/profile_images/488053457727655936/EjMtWPSx_400x400.png', 'name': 'Niebezpiecznik'}])
