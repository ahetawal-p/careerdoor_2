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

export async function loadQuestions(selectedCompany, pageNo, callback) {
  try {
    console.log(selectedCompany)
    const response = await fetch(
        `http://127.0.0.1:5000/questions?companyurl=${selectedCompany.qUrl}&page=${pageNo}`
      );
    const responseJson = await response.json();
    callback(responseJson.Questions, null)
  } catch (error) {
    console.error(error);
    callback(null, error)
  }
}
