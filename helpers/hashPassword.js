const { genSalt, hash } = require("bcryptjs");

function hashPassword(passowrd) {
    return genSalt().then((slat) => {
        return hash(passowrd, slat);
    });
}

module.exports = { hashPassword };
