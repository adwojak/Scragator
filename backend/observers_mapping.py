from attrdict import AttrDict

from backend.scrappers.names import ScrapperNames
from backend.scrappers.niebezpiecznik import Niebezpiecznik

observers_mapping: list = [
    AttrDict({
        'name': ScrapperNames.NIEBEZPIECZNIK.value,
        'url': 'http://www.niebezpiecznik.pl/',
        'scrapper': Niebezpiecznik
    })
]
