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
      // Eventually add some diff logic to see what new companies got added, and push them to start of list
      let isDataChanged = false
      if (currentDataSize !== 0 && currentDataSize < companiesResponse.length) {
        isDataChanged = true
      }
      dispatch({
        type: types.COMPANIES_LOAD_COMPLETED,
        companies:companiesResponse,
        isDataChanged
      })

      // setTimeout(() => {
      //   dispatch({
      //     type: types.COMPANIES_LOAD_COMPLETED,
      //     companies:companiesResponse,
      //     isDataChanged
      //   })
      // }, 1000);
    } else {
      dispatch({
        type: types.COMPANIES_LOAD_ERROR,
        error
      })
    }
  })
}

export const loadTopics = () => async (dispatch, getState) => {
  dispatch({
    type: types.TOPICS_LOAD_IN_PROGRESS
  })

  const currentDataSize = getState().Topics.topics.length
  Service.loadTopics((topicsResponse, error) => {
    if (!error && topicsResponse) {
      // check if the data size changed when compared to local storage
      // Eventually add some diff logic to see what new companies got added, and push them to start of list
      let isTopicsDataChanged = false
      if (currentDataSize !== 0 && currentDataSize < topicsResponse.length) {
        isTopicsDataChanged = true
      }
      dispatch({
        type: types.TOPICS_LOAD_COMPLETED,
        topics:topicsResponse,
        isTopicsDataChanged
      })
      // setTimeout(() => {
      //   dispatch({
      //     type: types.TOPICS_LOAD_COMPLETED,
      //     topics:topicsResponse,
      //     isTopicsDataChanged
      //   })
      // }, 1000);
    } else {
      dispatch({
        type: types.TOPICS_LOAD_ERROR,
        error
      })
    }
  })
}

export const loadFilter = () => async (dispatch, getState) => {
  const selectedFilter = getState().HomeFilter.currentSelectedFilter
  if (selectedFilter === 'Topics') {
    dispatch(loadTopics())
  } else if (selectedFilter === 'Companies') {
    dispatch(loadCompanies())
  }
}

export const onFilterUpdate = filterValue => async (dispatch, getState) => {
  const currentFilterValue = getState().HomeFilter.currentSelectedFilter
  if (filterValue === currentFilterValue) {
    return
  }
  dispatch({
    type: types.UPDATE_FILTER_VALUE,
    currentFilterValue: filterValue
  })
  dispatch(loadFilter())
}
