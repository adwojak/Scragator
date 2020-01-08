from enum import Enum


class ScrapperNames(Enum):
    NIEBEZPIECZNIK: tuple = ('Niebezpiecznik', 'https://pbs.twimg.com/profile_images/488053457727655936/EjMtWPSx_400x400.png')

    @classmethod
    def list_values(cls) -> list:
        list_values = []
        for el in map(lambda el: el.value, cls):
            list_values.append({
                'name': el[0],
                'img': el[1]
            })
        return list_values
