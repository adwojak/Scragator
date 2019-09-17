from attrdict import AttrDict
from typing import List
from niebezpiecznik import NiebezpiecznikObserver

observers_mapping: List = [
    AttrDict({
        'name': 'Niebezpiecznik',
        'url': 'http://www.niebezpiecznik.pl',
        'observer': NiebezpiecznikObserver
    })
]
