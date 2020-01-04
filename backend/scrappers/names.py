from enum import Enum


class ScrapperNames(Enum):
    NIEBEZPIECZNIK: str = 'Niebezpiecznik'

    @classmethod
    def list_values(cls) -> list:
        return list(map(lambda el: el.value, cls))
