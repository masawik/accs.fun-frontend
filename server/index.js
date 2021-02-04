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
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

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
  const cookies = req.cookies
  if (!isAuthorized(cookies)) return res.json(7)
  const to = cookies.login

  getMessages(to)
    .then(
      (result) => res.json(createResponse({mails: result})),
      (error) => res.json(error)
    )
})

app.get('/get-body', (req, res) => {
  const cookies = req.cookies
  if (!isAuthorized(cookies)) return res.json(7)
  const to = cookies.login
  let uid = req.query.uid
  if (!uid) return res.json(createResponse(4))

  getMailBody(to, uid)
    .then(
      (result) => res.json(createResponse({body: result})),
      (error) => res.json(error)
    )
})

//todo увеличить время жизни кук
//todo сделать сессии
app.post('/login', (req, res) => {
  const {login, password} = req.body
  if (isToInvalid(login) || !password || password.length < 5) return res.json(createResponse(5))

  getHashByLogin(login)
    .then(hash => {
      if (!isMatchPassword(password, hash)) return res.json(createResponse(6))
      const cookieKey = genSalt()
      setCookieByLogin(login, cookieKey)
        .then(() => {
          res.cookie('login', login, {maxAge: 1000 * 60 * 60, httpOnly: true});
          res.cookie('key', cookieKey, {maxAge: 1000 * 60 * 60, httpOnly: true});
          return res.json(createResponse({login}))
        })
        .catch(() => {
          return res.json(createResponse(2))
        })
    })
    .catch(e => {
      res.json(e)
    })
})

app.get('/get-user-data', async (req, res) => {
  const isAuth = await isAuthorized(req.cookies)
  if (isAuth === 7) return res.json(createResponse(2))
  if (!isAuth) return res.json(createResponse(7))
  const login = req.cookies.login
  res.json(createResponse({login}))
})

app.get('/need-login', async (req, res) => {
  const isAuth = await isAuthorized(req.cookies)
  if (isAuth === 7) return res.json(createResponse(2))
  res.json(createResponse({needLogin: !isAuth}))
})

app.get('/logout', (req, res) => {
  res.cookie('login', '', {maxAge: 0, httpOnly: true});
  res.cookie('key', '', {maxAge: 0, httpOnly: true});
  res.send(createResponse('ok'))
})

app.get('/', (req, res) => {
  res.send('hello!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
