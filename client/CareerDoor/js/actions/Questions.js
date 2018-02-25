import * as types from './types'
import * as Service from './service'

export const loadQuestions = () => async (dispatch, getState) => {
  dispatch({
    type: types.QUESTIONS_LOAD_IN_PROGRESS
  })

  const selectedCompany = getState().Companies.currentSelectedCompany

  Service.loadQuestions(selectedCompany, 0, (allQuestions, error) => {
    if (!error && allQuestions) {
      dispatch({
        type: types.QUESTIONS_LOAD_COMPLETED,
        questions:allQuestions
      })
    } else {
      dispatch({
        type: types.QUESTIONS_LOAD_ERROR,
        error
      })
    }
  })
}
