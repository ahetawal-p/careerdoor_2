import { Linking } from 'react-native'
import * as types from './types'
import * as Service from './service'
import { SOURCE_BASE_URL } from '../constants'

export const loadQuestions = pageNo => async (dispatch, getState) => {
  dispatch({
    type: types.QUESTIONS_LOAD_IN_PROGRESS
  })

  const selectedCompany = getState().Companies.currentSelectedCompany

  Service.loadQuestions(selectedCompany, pageNo, (allQuestions, error) => {
    if (!error && allQuestions) {
      setTimeout(() => {
        dispatch({
          type: types.QUESTIONS_LOAD_COMPLETED,
          questions:allQuestions,
          pageNo
        })
      }, 1000);

      // dispatch({
      //   type: types.QUESTIONS_LOAD_COMPLETED,
      //   questions:allQuestions
      // })
    } else {
      dispatch({
        type: types.QUESTIONS_LOAD_ERROR,
        error
      })
    }
  })
}

export const openQuestionDetail = question => async (dispatch, getState) => {
  dispatch({
    type: types.OPEN_QUESTION_DETAIL,
    currentSelectedQuestion: question
  })
}

export const loadQuestionDetail = () => async (dispatch, getState) => {
  dispatch({
    type: types.QUESTIONS_DETAIL_LOAD_IN_PROGRESS
  })
  const selectedQuestion = getState().Questions.currentSelectedQuestion

  Service.loadQuestionDetail(selectedQuestion.qId, (allDetails, error) => {
    if (!error && allDetails) {
      setTimeout(() => {
        dispatch({
          type: types.QUESTIONS_DETAIL_LOAD_COMPLETED,
          questionDetail:allDetails
        })
      }, 1000);
    } else {
      dispatch({
        type: types.QUESTIONS_DETAIL_LOAD_ERROR,
        error
      })
    }
  })
}

export const openQuestionExternalLink = question => async (dispatch, getState) => {
  const questionUrl = SOURCE_BASE_URL + question.qId
  Linking.canOpenURL(questionUrl).then((supported) => {
    if (!supported) {
      console.log(`Cannot handle url: ${url}`);
    } else {
      return Linking.openURL(questionUrl);
    }
  }).catch(err => console.error('An error occurred', err));
}
