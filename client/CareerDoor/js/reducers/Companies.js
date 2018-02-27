import * as types from '../actions/types'

const initialState = {
  companies: [],
  isLoadingCompany: true,
  isErrorLoadingCompany: false,
  isDataChanged: false,
  loadingError:{},
  currentSelectedCompany: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.COMPANIES_LOAD_COMPLETED:
      return {
        ...state,
        companies: action.companies,
        isLoadingCompany: false,
        isErrorLoadingCompany: false,
        isDataChanged: action.isDataChanged,
      }
    case types.COMPANIES_LOAD_IN_PROGRESS: {
      return {
        ...state,
        isLoadingCompany: true,
        isDataChanged: false,
      }
    }
    case types.COMPANIES_LOAD_ERROR: {
      return {
        ...state,
        isLoadingCompany: false,
        isDataChanged: false,
        isErrorLoadingCompany: true,
        loadingError: action.error
      }
    }
    case types.COMPANIES_LOAD_MORE: {
      return {
        ...state,
        isLoadingCompany: false,
        isDataChanged: false,
      }
    }
    case types.OPEN_QUESTIONS:
      return {
        ...state,
        currentSelectedCompany: action.currentSelectedCompany
      }
    default:
      return state
  }
}
