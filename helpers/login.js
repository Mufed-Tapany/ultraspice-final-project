const { compare } = require("bcryptjs");
const { getUserByEmail } = require("../database/db");

function login(email, passowrd) {
    return getUserByEmail(email).then((realUser) => {
        if (!realUser) {
            return null;
        }
        return compare(passowrd, realUser.password_hash).then((match) => {
            if (match) {
                return realUser;
            }
            return null;
        });
    });
}

module.exports = { login };
