from api.Manager.resource import ManagerResource
from api.TmpAll.resource import TmpAllResource

routing = {
    ManagerResource: ['/execute_observers'],
    TmpAllResource: ['/all'],
}