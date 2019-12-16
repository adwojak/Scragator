from attrdict import AttrDict

from backend.scrappers.names import ScrapperNames
from backend.scrappers.niebezpiecznik import Niebezpiecznik

observers_elements: list = [
    [ScrapperNames.NIEBEZPIECZNIK.value, 'http://www.niebezpiecznik.pl/', Niebezpiecznik],
]

observers_mapping: list = [AttrDict(
    name=value[0],
    url=value[1],
    scrapper=value[2]
) for value in observers_elements]
