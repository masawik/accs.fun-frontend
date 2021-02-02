const {getMessages, getMailBody} = require("./imap")
const {DOMAINS, PASSWORD} = require('./serverConfig')
const {encryptPassword, isMatchPassword} = require('./cryptoUtils')
const Imap = require('imap')
const inspect = require('util').inspect
const mysql = require('mysql')
const mimelib = require("mimelib")
const express = require('express')
const {createError} = require('./utils')

const app = express()
const port = 8989

function isToInvalid(to) {
  const [login, domain] = to.split('@')
  return !DOMAINS.includes(domain) || !login || login.length < 3;
}



app.get('/get-mails', (req, res) => {
  const to = req.query.to
  if (isToInvalid(to)) return res.json(createError('wrong email'))

  getMessages(to)
    .then(
      (result) => res.json(result),
      (error) => res.json(error)
    )
})

app.get('/get-body', (req, res) => {
  const to = req.query.to
  let uid = req.query.uid
  if (isToInvalid(to) || !uid) return res.json(createError('wrong data'))

  getMailBody(to, uid)
    .then(
      (result) => res.send(result),
      (error) => res.json(error)
    )
})

// app.get('/create-user', (req, res) => {
//   const login = req.query.login
//   const password = encryptPassword(req.query.password)
//
//   try {
//     const connection = mysql.createConnection({
//       host: '127.0.0.1',
//       port: 3306,
//       user: 'mysql',
//       password: 'mysql',
//       database: 'users',
//       charset: 'utf8_general_ci'
//     });
//     connection.connect(function (err) {
//       if (err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//       }
//       console.log('connected as id ' + connection.threadId);
//     });
//     connection.query(`INSERT INTO \`users\`(\`login\`, \`password\`) VALUES ('${login}', '${password}')`, function (error, results, fields) {
//       if (error) throw error;
//       console.log('The solution is: ', results);
//       connection.end();
//       res.send('OK')
//     });
//   } catch (e) {
//     res.send('NOK')
//   }
// })

app.get('/', (req, res) => {
  res.send('hello!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
