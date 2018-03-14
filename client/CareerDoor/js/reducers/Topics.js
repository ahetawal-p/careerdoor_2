import * as types from '../actions/types'

const initialState = {
  topics: [],
  isLoadingTopic: true,
  isErrorLoadingTopic: false,
  isTopicsDataChanged: false,
  currentSelectedTopic: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.TOPICS_LOAD_COMPLETED:
      return {
        ...state,
        topics: action.topics,
        isLoadingTopic: false,
        isErrorLoadingTopic: false,
        isTopicsDataChanged: action.isTopicsDataChanged,
      }
    case types.TOPICS_LOAD_IN_PROGRESS: {
      return {
        ...state,
        isLoadingTopic: true,
        isErrorLoadingTopic: false,
        isTopicsDataChanged: false,
      }
    }
    case types.TOPICS_LOAD_ERROR: {
      return {
        ...state,
        isLoadingTopic: false,
        isTopicsDataChanged: false,
        isErrorLoadingTopic: true
      }
    }
    case types.TOPICS_LOAD_MORE: {
      return {
        ...state,
        isLoadingTopic: false,
        isDataChanged: false,
      }
    }
    case types.OPEN_QUESTIONS:
      return {
        ...state,
        currentSelectedTopic: action.currentSelectedTopic
      }
    default:
      return state
  }
}
