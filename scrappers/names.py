from enum import Enum
from typing import List


class ScrapperNames(Enum):
    NIEBEZPIECZNIK: str = 'Niebezpiecznik'

    @classmethod
    def list_values(cls) -> list:
        return list(map(lambda el: el.value, cls))
