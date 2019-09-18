from attrdict import AttrDict
from typing import List
from scrappers.niebezpiecznik import Niebezpiecznik

observers_mapping: List = [
    AttrDict({
        'name': 'Niebezpiecznik',
        'url': 'http://www.niebezpiecznik.pl',
        'scrapper': Niebezpiecznik
    })
]
