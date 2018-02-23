import * as types from './types'
import * as Service from './service'


export const loadCompanies = () => async (dispatch, getState) => {
  dispatch({
    type: types.COMPANIES_LOAD_IN_PROGRESS
  })

  const currentDataSize = getState().Companies.companies.length
  Service.loadCompanies((companiesResponse, error) => {
    if (!error && companiesResponse) {
      // check if the data size changed when compared to local storage
      let isDataChanged = false
      if (currentDataSize !== 0 && currentDataSize < companiesResponse.length) {
        isDataChanged = true
      }
      setTimeout(() => {
        dispatch({
          type: types.COMPANIES_LOAD_COMPLETED,
          companies:companiesResponse,
          isDataChanged
        })
      }, 2000);
    } else {
      dispatch({
        type: types.COMPANIES_LOAD_ERROR,
        error
      })
    }
  })
}
