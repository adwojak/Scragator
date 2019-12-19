from backend.api.Articles.BasicPager.resource import PaginateArticle
from backend.api.Articles.ServiceFilteredPager.resource import FilteredPager
from backend.api.Articles.AddFavouriteArticle.resource import AddFavouriteArticle
from backend.api.Articles.RemoveFavouriteArticle.resource import RemoveFavouriteArticle
from backend.api.Articles.AddFavouriteService.resource import AddFavouriteService
from backend.api.Articles.RemoveFavouriteService.resource import RemoveFavouriteService
from backend.api.Manager.resource import ManagerResource
from backend.api.Services.resource import Services
from backend.api.UserManagement.Register.resource import RegisterUser
from backend.api.UserManagement.Login.resource import LoginUser, TestResource
from backend.api.UserManagement.TokenRefresh.resource import TokenRefresh
from backend.api.UserManagement.Logout.resource import AccessTokenLogout
from backend.api.UserManagement.Logout.resource import RefreshTokenLogout
from backend.api.UserManagement.Profile.resource import Profile

routing: dict = {
    ManagerResource: ['/execute_observers'],
    PaginateArticle: ['/page'],
    AddFavouriteArticle: ['/add_fav_article'],
    RemoveFavouriteArticle: ['/remove_fav_article'],
    AddFavouriteService: ['/add_fav_service'],
    RemoveFavouriteService: ['/remove_fav_service'],
    FilteredPager: ['/filter_by'],
    Services: ['/services'],
    RegisterUser: ['/user/register'],
    LoginUser: ['/user/login'],
    TokenRefresh: ['/user/token_refresh'],
    AccessTokenLogout: ['/user/logout_access'],
    RefreshTokenLogout: ['/user/logout_refresh'],
    Profile: ['/profile'],
    TestResource: ['/test'],
}
