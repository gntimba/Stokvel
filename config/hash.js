const randomstring = require("randomstring");
const SHA512 = require('crypto-js/sha512');
const randomnumber = require('random-number');
const uuidv4 = require('uuid/v4');
const shortid = require('shortid');

exports.generateString = () => {
    return SHA512(randomstring.generate() + Date.now()).toString();
};

exports.generateNumber = () => {
      options = {
        min: 111111,
        max: 999999,
        integer: true
      }
      return randomnumber(options) // example output → 999
}

exports.uuid = () => {
  const token = uuidv4();
  return token;
}

exports.generateShortId = () => {
  return shortid.generate();
}
