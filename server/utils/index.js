const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();


function validPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}


function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: genHash
    };
}

function issueJWT(user) {
    const _id = user._id;

    const expiresIn = '1d';

    const payload = {
        sub: _id,
        iat: Date.now()
    };
    const signedToken = jsonwebtoken.sign(payload, process.env.SECRET, { expiresIn, algorithm: 'RS256' });
    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }

}

module.exports = {
    validPassword,
    genPassword,
    issueJWT
}