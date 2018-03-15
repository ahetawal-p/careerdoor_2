import { Platform } from 'react-native'
import { SERVER_URL_X , SERVER_URL_ANDROID } from 'react-native-dotenv'

const SERVER_URL = __DEV__ && Platform.OS === 'android' ? SERVER_URL_ANDROID : SERVER_URL_X

export async function loadCompanies(callback) {
  try {
    const response = await fetch(
      `${SERVER_URL}/companies`
    );
    const responseJson = await response.json();
    callback(responseJson.Companies, null)
  } catch (error) {
    // console.error(error.message);
    callback(null, error.message)
  }
}

export async function loadTopics(callback) {
  try {
    const response = await fetch(
      `${SERVER_URL}/topics`
    );
    const responseJson = await response.json();
    callback(responseJson.Topics, null)
  } catch (error) {
    // console.error(error.message);
    callback(null, error.message)
  }
}

export async function loadQuestions(qUrl, pageNo, callback) {
  try {
    const response = await fetch(
        `${SERVER_URL}/questions?pid=${qUrl}&page=${pageNo}`
      );
    const responseJson = await response.json();
    callback(responseJson.Questions, null)
  } catch (error) {
    // console.error(error.message);
    callback(null, error.message)
  }
}

export async function loadQuestionDetail(questionId, callback) {
  try {
    console.log(questionId)
    const response = await fetch(
        `${SERVER_URL}${questionId}`
      );
    const responseJson = await response.json();
    callback(responseJson.QuestionDetail, null)
  } catch (error) {
    // console.error(error.message);
    callback(null, error.message)
  }
}
