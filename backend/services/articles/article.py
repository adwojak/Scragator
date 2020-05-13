from typing import List, Optional

from flask_sqlalchemy import BaseQuery
from sqlalchemy.sql.elements import UnaryExpression, BinaryExpression

from backend.models.models import ArticleModel
from backend.services.base import BaseService


class ArticleService(BaseService):
    model: ArticleModel = ArticleModel

    def order_desc(self) -> UnaryExpression:
        return self.model.id.desc()

    def _get_items(self, filter_by: Optional[BinaryExpression] = None) -> BaseQuery:
        items: BaseQuery = self.model_query()
        if filter_by is not None:  # SQLAlchemy problem with Boolean value
            items: BaseQuery = items.filter(filter_by)
        return items

    def get_items(self, page: int, filter_by: Optional[BinaryExpression] = None, ordered: bool = False) -> List[ArticleModel]:
        items: BaseQuery = self._get_items(filter_by)
        if ordered:
            items: BaseQuery = items.order_by(self.order_desc())
        return items.paginate(page=page, per_page=8).items

    def filter_by_service(self, service_name: str) -> BinaryExpression:
        return self.model.name.match(service_name)

    def filter_by_title(self, title: str) -> BinaryExpression:
        return self.model.title.match(title)

    def get_articles_by_ids(self, articles: List[int]) -> BinaryExpression:
        return self.model.id.in_(articles)
