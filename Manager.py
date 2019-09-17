from typing import List
from observers_mapping import observers_mapping


class Manager(object):

    @property
    def _observers_list(self) -> List:
        return [item.observer(item.url, item.name) for item in observers_mapping]

    def execute_observers(self) -> None:
        for observer in self._observers_list:
            observer.check_for_posts_updates()
