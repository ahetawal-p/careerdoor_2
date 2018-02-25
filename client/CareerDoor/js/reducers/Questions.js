import * as types from '../actions/types'

const initialState = {
  questions: [],
  isLoadingQuestions: true,
  isErrorLoadingQuestions: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.QUESTIONS_LOAD_IN_PROGRESS:
      return {
        ...state,
        isLoadingQuestions: true,
        isErrorLoadingQuestions: false
      }
    case types.QUESTIONS_LOAD_COMPLETED:
      return {
        ...state,
        questions: action.questions,
        isLoadingQuestions: false,
        isErrorLoadingQuestions: false,
      }
    case types.QUESTIONS_LOAD_ERROR:
      return {
        ...state,
        isLoadingQuestions: false,
        isErrorLoadingQuestions: true
      }
    default:
      return state
  }
}
