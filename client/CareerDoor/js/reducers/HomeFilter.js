import * as types from '../actions/types'

const initialState = {
  currentSelectedFilter : 'Companies',
  filterOptions: ['Companies','Topics']
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_FILTER_VALUE:
      return {
        ...state,
        currentSelectedFilter: action.currentFilterValue
      }
    default:
      return state
  }
}
