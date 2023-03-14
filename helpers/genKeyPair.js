/**
 * A module to generate public and private key pairs that are used in jwt authentication
 * @module helpers/genKeyPair
 * @author Josh Taylor
 * @see jsonwebtoken.js/* for the use of these keys
 */

const crypto = require('crypto');
const fs = require('fs');

/**
 * Function that returns a private and public key of file format .pem
 * @returns {File} the private and public .pem files
 */
function genKeyPair() {
    
    // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096, 
        publicKeyEncoding: {
            type: 'pkcs1', 
            format: 'pem' 
        },
        privateKeyEncoding: {
            type: 'pkcs1', 
            format: 'pem' 
        }
    });

    // Create the public key file
    fs.writeFileSync(__dirname + '/pub_key.pem', keyPair.publicKey); 
    
    // Create the private key file
    fs.writeFileSync(__dirname + '/priv_key.pem', keyPair.privateKey);

}

// Generate the keypair
genKeyPair();