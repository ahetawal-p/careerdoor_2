import { Linking } from 'react-native'
import intersectionBy from 'lodash.intersectionby'
import unionby from 'lodash.unionby'
import * as types from './types'
import * as Service from './service'
import { SOURCE_BASE_URL } from '../constants'

export const loadQuestions = pageNo => async (dispatch, getState) => {
  dispatch({
    type: types.QUESTIONS_LOAD_IN_PROGRESS
  })

  const selectedCompany = getState().Companies.currentSelectedCompany
  const bookmarks = getState().Questions.bookmarkQuestions

  Service.loadQuestions(selectedCompany, pageNo, (allQuestions, error) => {
    if (!error && allQuestions) {
      const commonArray = intersectionBy(bookmarks, allQuestions, 'qId')
      const enrichedBookmarked = commonArray.map((element, index) => {
        const currElement = element
        currElement.isBookmarked = true
        return currElement
      })
      const finalArray = unionby(enrichedBookmarked, allQuestions, 'qId')
      setTimeout(() => {
        dispatch({
          type: types.QUESTIONS_LOAD_COMPLETED,
          questions:finalArray,
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


export const updateBookmark = question => async (dispatch, getState) => {
  const bookmarks = getState().Questions.bookmarkQuestions
  const allQuestions = getState().Questions.questions
  const currentQuestion = Object.assign({}, question)
  const currentSelectedQuestion = getState().Questions.currentSelectedQuestion

  const updateAllQuestions = allQuestions.map((element, index) => {
    if (element.qId === currentQuestion.qId) {
      return currentQuestion
    }
    return element
  })

  if (question.isBookmarked) {
    currentQuestion.isBookmarked = false
    const bookmarkQuestions = bookmarks.filter(element => element.qId !== currentQuestion.qId)
    dispatch({
      type: types.BOOKMARK_QUESTIONS_REMOVE,
      bookmarkQuestions,
      questions:updateAllQuestions
    })
  } else {
    currentQuestion.isBookmarked = true
    dispatch({
      type: types.BOOKMARK_QUESTIONS_ADD,
      bookmarkQuestions: [...bookmarks, currentQuestion],
      questions:updateAllQuestions,
    })
  }

  if (currentSelectedQuestion && currentSelectedQuestion.qId === currentQuestion.qId) {
    dispatch({
      type: types.UPDATE_CURRENT_SELECTED_QUESTION,
      currentSelectedQuestion: currentQuestion,
    })
  }
}
