const {DOMAINS, PASSWORD} = require('./serverConfig')
const {encrypt, decrypt} = require('./cryptoUtils')
const Imap = require('imap'),
  inspect = require('util').inspect;
const mimelib = require("mimelib");
const express = require('express')
const app = express()
const port = 8989


app.get('/get-mails', (req, res) => {
  const to = req.query.to
  if (!DOMAINS.includes(to.split('@')[1])) {
    res.send('wrong email!')
    return
  }

  function getMessages(to) {
    const domain = to.split('@')[1]
    const msgs = []
    const imap = new Imap({
      user: `test@${domain}`,
      password: PASSWORD,
      host: `imap.${domain}`,
      port: 143,
      tls: false
    });
    imap.once('ready', () => {
      imap.openBox('INBOX', () => {
        imap.search([['TO', to], ['FROM', 'help@accts.epicgames.com']], (err, results) => {
          if (err) throw err;
          console.log(`Найдено: ${results.length} писем`)

          if (results.length === 0) {
            res.send('no mails')
            return
          }

          const f = imap.fetch(results, {bodies: 'HEADER.FIELDS (TO FROM SUBJECT)'});

          f.on('message', function (msg) {

            let messageInfo = {}

            msg.on('body', function (stream, info) {
              var buffer = '', count = 0;

              stream.on('data', function (chunk) {
                count += chunk.length;
                buffer += chunk.toString('utf8');
                if (info.which === 'TEXT') console.log('Body [%s] (%d/%d)', inspect(info.which), count, info.size);
              });

              stream.once('end', function () {
                if (info.which !== 'TEXT') {
                  const headers = Imap.parseHeader(buffer)
                  messageInfo.subject = headers.subject
                  messageInfo.from = headers.from
                  messageInfo.to = headers.to
                } else {
                  console.log('Body [%s] Finished', inspect(info.which));
                }
              });
            });

            msg.once('attributes', function (attrs) {
              messageInfo.date = attrs.date
              messageInfo.uid = encrypt('' + attrs.uid)
            });

            msg.once('end', function () {
              console.log(messageInfo)
              msgs.push(messageInfo)
              console.log(`____________________________`);
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
    })
    imap.connect()

    imap.once('end', () => {
      res.json(msgs)
    })
  }

  getMessages(to)
})

app.get('/get-body', (req, res) => {
  const to = req.query.to
  let uid = req.query.uid
  if (!DOMAINS.includes(to.split('@')[1]) || !uid) {
    res.send('wrong data')
    return
  }
  uid = decrypt(uid)
  function getMailBody(to, uid) {
    const domain = to.split('@')[1]
    const imap = new Imap({
      user: `test@${domain}`,
      password: PASSWORD,
      host: `imap.${domain}`,
      port: 143,
      tls: false
    });

    let mailBody

    function processMessage(msg) {
      msg.on("body", function (stream) {
        stream.on("data", function (chunk) {
          mailBody += chunk.toString("utf8")
        });
      });
    }

    imap.once('ready', () => {
      imap.openBox('INBOX', () => {
        const f = imap.fetch(uid, {bodies: 'TEXT'});


        f.on('message', processMessage)

        f.once('error', function (err) {
          console.log('Fetch error: ' + err);
        });

        f.once('end', function () {
          imap.end()
        });
      })
    })

    imap.once('end', () => {
      res.send(mimelib.decodeQuotedPrintable(mailBody))
    })
    imap.connect()
  }
  getMailBody(to, uid)
})

app.get('/', (req, res) => {
  res.send('hello!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
