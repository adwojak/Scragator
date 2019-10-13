from enum import Enum


class ScrapperNames(Enum):
    NIEBEZPIECZNIK = 'Niebezpiecznik'

    @classmethod
    def list_values(cls):
        return list(map(lambda el: el.value, cls))
