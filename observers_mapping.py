from attrdict import AttrDict
from typing import List
from scrappers.niebezpiecznik import Niebezpiecznik
from scrappers.names import ScrapperNames


observers_mapping: List = [
    AttrDict({
        'name': ScrapperNames.NIEBEZPIECZNIK.value,
        'url': 'http://www.niebezpiecznik.pl',
        'scrapper': Niebezpiecznik
    })
]
