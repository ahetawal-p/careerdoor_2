from toapi import Api
from items.page import Page
from items.companies import Companies
from settings import MySettings

api = Api(None, settings=MySettings)
api.register(Page)
api.register(Companies)

if __name__ == '__main__':
    api.serve()
