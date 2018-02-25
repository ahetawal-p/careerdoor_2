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

export async function loadQuestions(callback) {
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
