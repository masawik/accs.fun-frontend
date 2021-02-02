'use strict';
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const SALT_MAIL_ID = 'kQALCJjfGxvOXi8GBmEKz0zOWr6StNSD';

function encrypt(salt, text) {
  let iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(salt), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(salt, text) {
  let textParts = text.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(salt), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

function encryptPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  let encPassword = bcrypt.hashSync(password, salt);

  const piece = encPassword.slice(10,20)
  encPassword = encPassword.replace(piece, '')
  encPassword = encPassword + piece
  return encPassword
}

function isMatchPassword(password, hash) {
  const piece = hash.slice(-10)
  hash = hash.replace(piece, '')
  hash = hash.slice(0,10) + piece + hash.slice(10)
  const salt = hash.slice(0,29)
  return bcrypt.hashSync(password, salt) === hash
}

const encryptMailId = (id) => encrypt(SALT_MAIL_ID, id)
const decryptMailId = (id) => decrypt(SALT_MAIL_ID, id)


module.exports = {
  encryptMailId,
  decryptMailId,
  encryptPassword,
  isMatchPassword
};