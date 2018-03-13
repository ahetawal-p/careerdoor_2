export async function loadCompanies(callback) {
  try {
    const response = await fetch(
      'http://127.0.0.1:5000/companies'
    );
    const responseJson = await response.json();
    callback(responseJson.Companies, null)
  } catch (error) {
    console.error(error);
    callback(null, error)
  }
}

export async function loadTopics(callback) {
  try {
    const response = await fetch(
      'http://127.0.0.1:5000/topics'
    );
    const responseJson = await response.json();
    callback(responseJson.Topics, null)
  } catch (error) {
    console.error(error);
    callback(null, error)
  }
}

export async function loadQuestions(qUrl, pageNo, callback) {
  try {
    const response = await fetch(
        `http://127.0.0.1:5000/questions?pid=${qUrl}&page=${pageNo}`
      );
    const responseJson = await response.json();
    callback(responseJson.Questions, null)
  } catch (error) {
    console.error(error);
    callback(null, error)
  }
}

export async function loadQuestionDetail(questionId, callback) {
  try {
    console.log(questionId)
    const response = await fetch(
        `http://127.0.0.1:5000${questionId}`
      );
    const responseJson = await response.json();
    callback(responseJson.QuestionDetail, null)
  } catch (error) {
    console.error(error);
    callback(null, error)
  }
}
