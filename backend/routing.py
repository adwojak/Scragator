from backend.api.Articles.BasicPager.resource import PaginateArticle
from backend.api.Manager.resource import ManagerResource
from backend.api.Services.resource import Services

routing: dict = {
    ManagerResource: ['/execute_observers'],
    PaginateArticle: ['/page'],
    Services: ['/services'],
}
