import * as types from './types'

export const loadMoreTopics = () => async (dispatch, getState) => {
  dispatch({
    type: types.TOPICS_LOAD_MORE
  })
}

export const openQuestionsFromTopic = topic => async (dispatch, getState) => {
  dispatch({
    type: types.OPEN_QUESTIONS,
    titleName: topic.topicName,
    currentSelectedTopic: topic
  })
}
