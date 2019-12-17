from backend.api.Articles.BasicPager.resource import PaginateArticle
from backend.api.Articles.ServiceFilteredPager.resource import FilteredPager
from backend.api.Manager.resource import ManagerResource
from backend.api.Services.resource import Services
from backend.api.UserManagement.Register.resource import RegisterUser

routing: dict = {
    ManagerResource: ['/execute_observers'],
    PaginateArticle: ['/page'],
    FilteredPager: ['/filter_by'],
    Services: ['/services'],
    RegisterUser: ['/user/register'],
}
