const {DB_CONFIG} = require("./serverConfig")
const mysql = require('mysql');
const {createResponse} = require('./utils')

const getConn = () => (
  mysql.createConnection({
    ...DB_CONFIG,
    charset: 'utf8_general_ci'
  })
)

const getHashByLogin = (login) => (
  new Promise((resolve, reject) => {
    const connection = getConn()
    connection.query(`SELECT \`password\` FROM \`users\` WHERE login = '${login}'`, function (error, results) {
      connection.end()
      if (error) return reject(createResponse(2))
      if (!results.length) return reject(createResponse(5))
      return resolve(results[0].password)
    })
  })
)

const setCookieByLogin = (login, cookie) => (
  new Promise((resolve, reject) => {
    const connection = getConn()
    connection.query(`UPDATE \`users\` SET \`cookie\`='${cookie}' WHERE \`login\` = '${login}'`, function (error) {
      connection.end()
      if (error) return reject(createResponse(2))
      return resolve()
    })
  })
)

const getCookieByLogin = (login) => (
  new Promise((resolve, reject) => {
    const connection = getConn()
    connection.query(`SELECT \`cookie\` FROM \`users\` WHERE \`login\` = '${login}'`, function (error, results) {
      connection.end()
      if (error) return reject(createResponse(2))
      return resolve(results[0].cookie)
    })
  })
)

module.exports = {
  getHashByLogin,
  setCookieByLogin,
  getCookieByLogin
}
