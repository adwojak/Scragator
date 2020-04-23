from enum import Enum


class ScrapperNames(Enum):
    NIEBEZPIECZNIK: tuple = ('Niebezpiecznik',
                             'https://pbs.twimg.com/profile_images/488053457727655936/EjMtWPSx_400x400.png')

    @classmethod
    def list_values(cls) -> list:
        list_values: list = []
        for el in map(lambda elem: elem.value, cls):
            list_values.append(cls.parse_scrapper(el))
        return list_values

    @staticmethod
    def parse_scrapper(scrapper) -> dict:
        return {
            'name': scrapper[0],
            'img': scrapper[1]
        }
