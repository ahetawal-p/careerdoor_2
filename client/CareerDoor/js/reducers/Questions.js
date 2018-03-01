import * as types from '../actions/types'

const initialState = {
  questions: [],
  isLoadingQuestions: true,
  isErrorLoadingQuestions: false,
  pageNo: 0,
  currentSelectedQuestion:{},
  isLoadingQuestionDetail: false,
  isErrorLoadingQuestionDetail: false,
  questionDetail:[],
  bookmarkQuestions:[]
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.OPEN_QUESTIONS:
      return {
        ...state,
        questions: []
      }
    case types.QUESTIONS_LOAD_IN_PROGRESS:
      return {
        ...state,
        isLoadingQuestions: true,
        isErrorLoadingQuestions: false
      }
    case types.QUESTIONS_LOAD_COMPLETED:
      return {
        ...state,
        questions: [...state.questions, ...action.questions],
        isLoadingQuestions: false,
        isErrorLoadingQuestions: false,
        pageNo: action.pageNo
      }
    case types.QUESTIONS_LOAD_ERROR:
      return {
        ...state,
        isLoadingQuestions: false,
        isErrorLoadingQuestions: true
      }
    case types.OPEN_QUESTION_DETAIL:
      return {
        ...state,
        currentSelectedQuestion: action.currentSelectedQuestion
      }
    case types.QUESTIONS_DETAIL_LOAD_IN_PROGRESS:
      return {
        ...state,
        isLoadingQuestionDetail: true,
        isErrorLoadingQuestionDetail: false
      }
    case types.QUESTIONS_DETAIL_LOAD_COMPLETED:
      return {
        ...state,
        isLoadingQuestionDetail: false,
        isErrorLoadingQuestionDetail: false,
        questionDetail: action.questionDetail
      }
    case types.QUESTIONS_DETAIL_LOAD_ERROR:
      return {
        ...state,
        isLoadingQuestionDetail: false,
        isErrorLoadingQuestionDetail: true,
      }
    case types.BOOKMARK_QUESTIONS_ADD:
    case types.BOOKMARK_QUESTIONS_REMOVE:
      return {
        ...state,
        bookmarkQuestions:action.bookmarkQuestions
      }

    default:
      return state
  }
}
