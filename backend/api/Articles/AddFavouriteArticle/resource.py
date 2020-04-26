from flask import Response, jsonify
from flask_jwt_extended import jwt_required

from backend.libs.Resource.FormResource import FormResource
from backend.services.user.user import UserService
from backend.api.Articles.AddFavouriteArticle.form import AddFavouriteArticleForm


class AddFavouriteArticle(FormResource):

    FORM = AddFavouriteArticleForm

    @jwt_required
    def post(self) -> Response:
        article_id: int = self.form_data['article_id']
        user_service: UserService = UserService()
        user: user_service.model = user_service.get_logged_user()

        if user and article_id not in user.favourite_articles:
            user_service.add_fav_articles(article_id)
            return jsonify({
                'success': True,
                'user_fav_articles': user_service.get_fav_articles()
            })
        return jsonify({
            'error': True
        })
