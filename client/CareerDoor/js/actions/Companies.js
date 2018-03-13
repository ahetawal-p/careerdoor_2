import * as types from './types'

export const loadMoreCompanies = () => async (dispatch, getState) => {
  dispatch({
    type: types.COMPANIES_LOAD_MORE
  })
}

export const openQuestionsFromCompany = company => async (dispatch, getState) => {
  dispatch({
    type: types.OPEN_QUESTIONS,
    titleName: company.companyName,
    currentSelectedCompany: company
  })
}
