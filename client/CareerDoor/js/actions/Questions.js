import * as types from './types'
import * as Service from './service'

export const loadQuestions = () => async (dispatch, getState) => {
  dispatch({
    type: types.QUESTIONS_LOAD_IN_PROGRESS
  })

  Service.loadCompanies((companiesResponse, error) => {
    if (!error && companiesResponse) {
      // check if the data size changed when compared to local storage
      // Eventually add some diff logic to see what new companies got added, and push them to start of list
      let isDataChanged = false
      if (currentDataSize !== 0 && currentDataSize < companiesResponse.length) {
        isDataChanged = true
      }
      setTimeout(() => {
        dispatch({
          type: types.QUESTIONS_LOAD_COMPLETED,
          companies:companiesResponse,
          isDataChanged
        })
      }, 1000);
    } else {
      dispatch({
        type: types.QUESTIONS_LOAD_ERROR,
        error
      })
    }
  })
}
