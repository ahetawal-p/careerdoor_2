import * as types from './types'
import * as Service from './service'

export const loadQuestions = pageNo => async (dispatch, getState) => {
  dispatch({
    type: types.QUESTIONS_LOAD_IN_PROGRESS
  })

  const selectedCompany = getState().Companies.currentSelectedCompany

  Service.loadQuestions(selectedCompany, pageNo, (allQuestions, error) => {
    if (!error && allQuestions) {
      setTimeout(() => {
        dispatch({
          type: types.QUESTIONS_LOAD_COMPLETED,
          questions:allQuestions
        })
      }, 1000);

      // dispatch({
      //   type: types.QUESTIONS_LOAD_COMPLETED,
      //   questions:allQuestions
      // })
    } else {
      dispatch({
        type: types.QUESTIONS_LOAD_ERROR,
        error
      })
    }
  })
}
