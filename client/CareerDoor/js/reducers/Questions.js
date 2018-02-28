import * as types from '../actions/types'

const initialState = {
  questions: [],
  isLoadingQuestions: true,
  isErrorLoadingQuestions: false,
  pageNo: 0,
  currentSelectedQuestion:{}
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

    default:
      return state
  }
}
