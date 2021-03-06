'use strict';
/**
 * @file json-decrypt main
 * @module json-decrypt
 * @subpackage main
 * @version 0.2.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
var crypto = require('crypto');

function check(obj, index, key) {

  if (typeof obj !== 'object') {
    throw new TypeError('First argument is not an Object');
  } else if (obj[index] === undefined) {
    throw new TypeError('Second argument is undefined');
  }
  if (!key) {
    throw new TypeError('Key must be a buffer');
  }

  return obj[index];
}

/*
 * functions
 */
/**
 * Decrypt your json.
 * 
 * @function decrypt
 * @param {Object} obj - your object
 * @param {String} index - object key
 * @param {String} key - your key
 * @param {String} [cipher] - cipher
 * @param {String} [encoding] - output encoding
 * @return {Object}
 */
function decrypt(obj, index, key, cipher, encoding) {

  var _prv = check(obj, index, key);
  var _key = key;

  for (var i = 0, ii = _prv.length; i < ii; ++i) {
    var pit = _prv[i].split('.');
    var vars = 'obj';
    for (var j = 0, jj = pit.length; j < jj; ++j) {
      vars += '[pit[' + j + ']]';
    }

    var ciph = crypto.createDecipher(cipher || 'aes-128-cfb', _key);
    var p = ciph.update(eval(vars), encoding || 'base64', 'utf8')
      + ciph.final('utf8').toString('utf8');

    eval(vars + '="' + p + '";');
  }
  return obj;
}
module.exports.decrypt = decrypt;

/**
 * Encrypt your json.
 * 
 * @function encrypt
 * @param {Object} obj - your object
 * @param {String} index - object key
 * @param {String} key - your key
 * @param {String} [cipher] - cipher
 * @param {String} [encoding] - output encoding
 * @return {Object}
 */
function encrypt(obj, index, key, cipher, encoding) {

  var _prv = check(obj, index, key);
  var _key = key;

  for (var i = 0, ii = _prv.length; i < ii; ++i) {
    var pit = _prv[i].split('.');
    var vars = 'obj';
    for (var j = 0, jj = pit.length; j < jj; ++j) {
      vars += '[pit[' + j + ']]';
    }

    var ciph = crypto.createCipher(cipher || 'aes-128-cfb', _key);
    var p = ciph.update(eval(vars), 'utf8', encoding || 'base64')
      + ciph.final(encoding || 'base64').toString('utf8');

    eval(vars + '="' + p + '";');
  }
  return obj;
}
module.exports.encrypt = encrypt;
