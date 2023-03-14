/**
 * A module which will help to verify and generate salted and hashed passwords for authentication
 * @module helpers/passwordHelpers
 * @author Josh Taylor
 */


const crypto = require('crypto');

/**
 * A function which verifies a plaintext password against a hashed password in persistent storage
 * @param {string} password - this is the password in plaintext that needs to be verified
 * @param {string} hash - this is the password that is stored in persistent storage and will be used to verify
 * @param {string} salt -  this is the salt that was used in the hashing of password2
 * @returns {boolean} - an indicator to whether the password in question is valid
 */
function validPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

/**
 * A function which turns a plaintext password into a hashed password
 * @param {string} password - this is the plaintext password that is given to the function
 * @returns {object} - the object which consists of the newly hashed password and the salt the function used
 */
function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: genHash
    };
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;