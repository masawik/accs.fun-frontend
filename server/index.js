const {getHashByLogin, setCookieByLogin} = require("./DB")
const {getMessages, getMailBody} = require("./imap")
const {DOMAINS} = require('./serverConfig')
const {isMatchPassword, genSalt} = require('./cryptoUtils')
const express = require('express')
const {createError} = require('./utils')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

// todo убрать. это только для теста
app.use(bodyParser.urlencoded({ extended: true }))

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
      (error) => res.json(createError(error))
    )
})

app.get('/get-body', (req, res) => {
  const to = req.query.to
  let uid = req.query.uid
  if (isToInvalid(to) || !uid) return res.json(createError('wrong data'))

  getMailBody(to, uid)
    .then(
      (result) => res.send(result),
      (error) => res.json(createError(error))
    )
})

app.post('/login', (req, res) => {
  const {login, password} = req.body
  if (isToInvalid(login) || !password || password.length < 5) return res.json(createError('wrong user data'))

  getHashByLogin(login)
    .then(hash => {
      if (!isMatchPassword(password, hash)) return res.json(createError('wrong password'))
      const cookieKey = genSalt()
      setCookieByLogin(login, cookieKey)
        .then(() => {
          res.cookie('login', login, { maxAge: 900000, httpOnly: true });
          res.cookie('key', cookieKey, { maxAge: 900000, httpOnly: true });
          return res.json({success: true})
        })
        .catch(() => {
          return res.json(createError('server Error'))
        })
    })
    .catch(e => {
      return res.json(createError(e))
    })
})

app.get('/', (req, res) => {
  res.send('hello!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
