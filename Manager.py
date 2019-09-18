from typing import List
from observers_mapping import observers_mapping
from libs.Observer.observer import BaseObserver


class Manager(object):

    @property
    def _observers_list(self) -> List:
        return [BaseObserver(item.url, item.name, item.scrapper) for item in observers_mapping]

    def execute_observers(self) -> None:
        for observer in self._observers_list:
            observer.check_for_posts_updates()