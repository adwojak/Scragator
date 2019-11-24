from api.Articles.BasicPager.resource import PaginateArticle
from api.Manager.resource import ManagerResource
from api.Services.resource import Services

routing: dict = {
    ManagerResource: ['/execute_observers'],
    PaginateArticle: ['/page'],
    Services: ['/services'],
}
