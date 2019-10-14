from api.Manager.resource import ManagerResource
from api.Articles.BasicPager.resource import PaginateArticle
from api.Services.resource import Services

routing = {
    ManagerResource: ['/execute_observers'],
    PaginateArticle: ['/page'],
    Services: ['/services'],
}
