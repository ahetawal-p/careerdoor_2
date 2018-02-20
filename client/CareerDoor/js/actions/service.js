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

export async function logoutCurrentUser(callback) {
  try {
    await Parse.User.logOut();
    const currentUser = Parse.User.current();
    callback(currentUser, null)
  } catch (e) {
    console.log(e)
    callback(false, e)
  }
}
