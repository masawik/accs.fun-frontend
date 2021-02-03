const {getHashByLogin, setCookieByLogin, getCookieByLogin} = require("./DB")
const {getMessages, getMailBody} = require("./imap")
const {DOMAINS} = require('./serverConfig')
const {isMatchPassword, genSalt} = require('./cryptoUtils')
const express = require('express')
const {createResponse} = require('./utils')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());

const port = 8989

function isToInvalid(to) {
  const [login, domain] = to.split('@')
  return !DOMAINS.includes(domain) || !login || login.length < 3;
}

async function isAuthorized(cookies) {
  if (!cookies.login) return false
  const {login} = cookies
  return getCookieByLogin(login)
    .then(key => {
      return key === cookies.key
    })
    .catch(e => {
      console.log(e)
      return 7
    })
}

app.get('/get-mails', (req, res) => {
  const to = req.query.to
  if (isToInvalid(to)) return res.json(createResponse(1, 'wrong email'))

  getMessages(to)
    .then(
      (result) => res.json(createResponse(0, result)),
      (error) => res.json(error)
    )
})

app.get('/get-body', (req, res) => {
  const to = req.query.to
  let uid = req.query.uid
  if (isToInvalid(to) || !uid) return res.json(createResponse(4, 'wrong data'))

  getMailBody(to, uid)
    .then(
      (result) => res.send(result),
      (error) => res.json(error)
    )
})

app.post('/login', (req, res) => {
  const {login, password} = req.body
  if (isToInvalid(login) || !password || password.length < 5) return res.json(createResponse(5, 'wrong auth data'))

  getHashByLogin(login)
    .then(hash => {
      if (!isMatchPassword(password, hash)) return res.json(createResponse(6, 'wrong password'))
      const cookieKey = genSalt()
      setCookieByLogin(login, cookieKey)
        .then(() => {
          res.cookie('login', login, {maxAge: 900000, httpOnly: true});
          res.cookie('key', cookieKey, {maxAge: 900000, httpOnly: true});
          return res.json(createResponse(0, 'success'))
        })
        .catch(() => {
          return res.json(createResponse(2, 'server Error'))
        })
    })
    .catch(() => {
      return res.json(createResponse(2, 'server Error'))
    })
})

app.get('/need-login', async (req, res) => {
  const isAuth = await isAuthorized(req.cookies)
  if (isAuth === 7) return res.json(createResponse(2, 'server Error'))
  res.json(createResponse(0, {needLogin: !isAuth}))
})

app.get('/get-user-data', async (req, res) => {
  const isAuth = await isAuthorized(req.cookies)
  if (isAuth === 7) return res.json(createResponse(2, 'server Error'))
  if (!isAuth) return res.json(createResponse(7, 'unauthorized'))
  const login = req.cookies.login
  res.json(createResponse(0, {login}))
})

app.get('/', (req, res) => {
  res.send('hello!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
