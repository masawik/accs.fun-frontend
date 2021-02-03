function createResponse(code, data) {
  return {code: code, data: data}
}

//0 - success
//1 - invalid mail
//2 - server error
//3 - invalid uid
//4 - get body wrong data
//5 - wrong auth data
//6 - wrong password
//7 - unauthorized

module.exports = {
  createResponse
}