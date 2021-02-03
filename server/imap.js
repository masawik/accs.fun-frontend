const Imap = require('imap')
const {PASSWORD} = require('./serverConfig')
const {encryptMailId, decryptMailId} = require('./cryptoUtils')
const mimelib = require("mimelib")

const getImap = (to) => {
  const domain = to.split('@')[1]
  return new Imap({
    user: `test@${domain}`,
    password: PASSWORD,
    host: `imap.${domain}`,
    port: 143,
    tls: false
  })
}

const getUids = (to, imap) => (
  new Promise((resolve, reject) => {
    imap = imap ? imap : getImap(to)
    let uids
    imap.once('ready', () => {
      imap.openBox('INBOX', () => {
        imap.search([['TO', to], ['FROM', 'help@accts.epicgames.com']], (err, results) => {
          if (err) return reject(err)
          uids = results
          imap.end()
        })
      })
    })

    imap.once('end', () => {
      return resolve(uids)
    })
    imap.connect()
  })
)

const getMessages = (to) => (
  new Promise((resolve) => {
    const imap = getImap(to)
    getUids(to, imap)
      .then(uids => {
        const msgs = []
        imap.once('ready', () => {
          imap.openBox('INBOX', () => {
            const f = imap.fetch(uids, {bodies: 'HEADER.FIELDS (TO FROM SUBJECT)'});

            f.on('message', function (msg) {
              let messageInfo = {}
              msg.on('body', function (stream) {
                let buffer = ''

                stream.on('data', function (chunk) {
                  buffer += chunk.toString('utf8')
                });

                stream.once('end', function () {
                  const headers = Imap.parseHeader(buffer)
                  messageInfo.subject = headers.subject
                  messageInfo.from = headers.from
                  messageInfo.to = headers.to
                });
              });

              msg.once('attributes', function (attrs) {
                messageInfo.date = attrs.date
                messageInfo.uid = encryptMailId('' + attrs.uid)
              });

              msg.once('end', function () {
                msgs.push(messageInfo)
              });
            })

            f.once('error', function (err) {
              console.log('Fetch error: ' + err);
            });

            f.once('end', function () {
              imap.end()
            });
          })
        })
        imap.once('end', () => {
          return resolve(msgs)
        })
        imap.connect()
      })
  })
)

const getMailBody = (to, uid) => (
  new Promise((resolve, reject) => {
    try {
      uid = decryptMailId(uid)
    } catch (e) {
      return reject('uid is invalid')
    }

    const imap = getImap(to)
    let mailBody = ''

    imap.once('ready', () => {
      imap.openBox('INBOX', () => {
        const f = imap.fetch(uid, {bodies: 'TEXT'});

        f.on('message', (msg) => {
          msg.on("body", function (stream) {
            stream.on("data", function (chunk) {
              mailBody += chunk.toString("utf8")
            });
          });
        })

        f.once('end', function () {
          imap.end()
        });
      })
    })

    imap.once('end', () => {
      return resolve(mimelib.decodeQuotedPrintable(mailBody))
    })

    imap.connect()
  })
)

module.exports = {
  getMessages,
  getMailBody
}