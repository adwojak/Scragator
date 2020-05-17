from backend.test.base.testing import ResourceTesting
from backend.api.Manager.resource import ManagerResource


class TestManager(ResourceTesting):
    url: str = '/execute_observers'
    resource: ManagerResource = ManagerResource

    def test_manager(self, app):
        super().init(app)
        response: dict = self.request_get()
        self.assert_dicts(response, {})
