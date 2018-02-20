import * as types from './types'
import * as Service from './service'


export const loadCompanies = () => async (dispatch, getState) => {
  dispatch({
    type: types.COMPANIES_LOAD_IN_PROGRESS
  })

  Service.loadCompanies((companies, error) => {
    if (!error && companies) {
      dispatch({
        type: types.COMPANIES_LOAD_COMPLETED,
        companies
      })
    } else {
      dispatch({
        type: types.COMPANIES_LOAD_ERROR,
        error
      })
    }
  })
}
