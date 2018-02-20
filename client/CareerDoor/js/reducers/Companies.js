import * as types from '../actions/types'

const initialState = {
  companies: [],
  isLoadingCompany: false,
  isErrorLoadingCompany: false,
  loadingError:{}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.COMPANIES_LOAD_COMPLETED:
      return {
        ...state,
        companies: action.companies,
        isLoadingCompany: false,
        isErrorLoadingCompany: false,
      }
    case types.COMPANIES_LOAD_IN_PROGRESS: {
      return {
        ...state,
        isLoadingCompany: true
      }
    }
    case types.COMPANIES_LOAD_ERROR: {
      return {
        ...state,
        isLoadingCompany: false,
        isErrorLoadingCompany: true,
        loadingError: action.error
      }
    }
    default:
      return state
  }
}
