from toapi import Api
from items.page import Page
from items.companies import Companies
from items.questions import Questions
from items.questionDetail import QuestionDetail
from items.topics import Topics
from settings import MySettings

api = Api(None, settings=MySettings)
api.register(Page)
api.register(Companies)
api.register(Questions)
api.register(QuestionDetail)
api.register(Topics)

if __name__ == '__main__':
    api.serve()
