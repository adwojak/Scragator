from attrdict import AttrDict
from scrappers.niebezpiecznik import Niebezpiecznik
from scrappers.names import ScrapperNames


observers_mapping: list = [
    AttrDict({
        'name': ScrapperNames.NIEBEZPIECZNIK.value,
        'url': 'http://www.niebezpiecznik.pl/',
        'scrapper': Niebezpiecznik
    })
]
