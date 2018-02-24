from toapi import Api
from items.page import Page
from items.companies import Companies
from items.questions import Questions
from settings import MySettings

api = Api(None, settings=MySettings)
api.register(Page)
api.register(Companies)
api.register(Questions)

if __name__ == '__main__':
    api.serve()
