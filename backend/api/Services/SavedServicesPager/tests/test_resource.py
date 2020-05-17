from backend.test.base.testing import ResourceTesting
from backend.api.Services.SavedServicesPager.resource import SavedServices


class TestSavedServices(ResourceTesting):
    url: str = '/saved_services'
    resource: SavedServices = SavedServices

    def test_saved_services(self, app):
        super().init(app, fav_service={'service_name': 'Niebezpiecznik'})
        response: dict = self.request_get()
        self.assert_match(response, [
            {'img': 'https://pbs.twimg.com/profile_images/488053457727655936/EjMtWPSx_400x400.png',
             'name': 'Niebezpiecznik'}
        ])
