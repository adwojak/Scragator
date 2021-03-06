from backend.api.Manager.resource import ManagerResource
from backend.api.Articles.BasicPager.resource import PaginateArticle
from backend.api.UserManagement.Login.resource import LoginUser
from backend.api.Services.ListServices.resource import Services
from backend.api.UserManagement.Logout.resource import AccessTokenLogout, RefreshTokenLogout
from backend.api.UserManagement.Profile.resource import Profile
from backend.api.UserManagement.Register.resource import RegisterUser
from backend.api.UserManagement.DeleteUser.resource import DeleteUser
from backend.api.Articles.SavedArticlesPager.resource import SavedArticlesPager
from backend.api.Services.SavedServicesPager.resource import SavedServices
from backend.api.UserManagement.TokenRefresh.resource import TokenRefresh
from backend.api.Articles.AddFavouriteArticle.resource import AddFavouriteArticle
from backend.api.Articles.SearchArticlesPager.resource import SearchArticlesPager
from backend.api.Services.AddFavouriteService.resource import AddFavouriteService
from backend.api.Articles.ServiceFilteredPager.resource import FilteredPager
from backend.api.UserManagement.InitializeUser.resource import InitializeUser
from backend.api.Articles.RemoveFavouriteArticle.resource import RemoveFavouriteArticle
from backend.api.Services.RemoveFavouriteService.resource import RemoveFavouriteService

routing: dict = {
    ManagerResource: ['/execute_observers'],
    PaginateArticle: ['/'],
    FilteredPager: ['/service_articles'],
    SavedArticlesPager: ['/saved_articles'],
    SavedServices: ['/saved_services'],
    AddFavouriteArticle: ['/add_fav_article'],
    RemoveFavouriteArticle: ['/remove_fav_article'],
    AddFavouriteService: ['/add_fav_service'],
    RemoveFavouriteService: ['/remove_fav_service'],
    SearchArticlesPager: ['/search_articles'],  # nie dziala
    Services: ['/services'],
    RegisterUser: ['/user/register'],
    InitializeUser: ['/user/initialize'],  # Dodać na froncie
    LoginUser: ['/user/login'],
    DeleteUser: ['/user/delete_user'],
    Profile: ['/profile'],  # Dodać na froncie
    TokenRefresh: ['/user/token_refresh'],
    AccessTokenLogout: ['/user/logout_access'],
    RefreshTokenLogout: ['/user/logout_refresh'],
}
