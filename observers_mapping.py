from attrdict import AttrDict

from scrappers.names import ScrapperNames
from scrappers.niebezpiecznik import Niebezpiecznik

observers_mapping: list = [
    AttrDict({
        'name': ScrapperNames.NIEBEZPIECZNIK.value,
        'url': 'http://www.niebezpiecznik.pl/',
        'scrapper': Niebezpiecznik
    })
]
