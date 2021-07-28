const spicedPg = require("spiced-pg");
const database = "bbdatabase";
const { hashPassword } = require("../helpers/hashPassword");

function getDatabaseURL() {
    if (process.env.DATABASE_URL) {
        return process.env.DATABASE_URL;
    }
    const { username, password } = require("../secrets.json");
    return `postgres:${username}:${password}@localhost:5432/${database}`;
}

const db = spicedPg(getDatabaseURL());

console.log("[db ... ]", database);

function createUser({ first_name, last_name, email, password_hash }) {
    return db
        .query(
            "INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *",
            [first_name, last_name, email, password_hash]
        )
        .then((result) => result.rows[0]);
}

function getUserByEmail(email) {
    return db
        .query("SELECT * FROM users WHERE email = $1", [email])
        .then((result) => result.rows[0]);
}

function createPasswordResetCode({ email, code }) {
    return db
        .query(
            "INSERT INTO reset_password (email, code) VALUES ($1, $2) RETURNING *",
            [email, code]
        )
        .then((result) => result.rows[0]);
}

function getCodeByEmail({ email, code }) {
    return db
        .query(
            "SELECT code FROM reset_password WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' AND email = $1 AND code = $2",
            [email, code]
        )
        .then((result) => result.rows[0]);
}

function updatePassword({ password, email }) {
    return hashPassword(password).then((password_hash) => {
        return db.query(
            "UPDATE users SET password_hash = $1 WHERE email = $2 RETURNING *",
            [password_hash, email]
        );
    });
}

// function getImage({ userId, first_name, last_name, email, image }) {
//     return db
//         .query(
//             "INSERT INTO orders (userId, first_name, last_name, email, image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
//             [userId, first_name, last_name, email, image]
//         )
//         .then((result) => result.rows[0]);
// }

function getImage({ image, userId }) {
    return db
        .query(
            "INSERT INTO orders (image, userId) VALUES ($1, $2) RETURNING *",
            [image, userId]
        )
        .then((result) => result.rows[0]);
}

function getUserById(id) {
    return db
        .query("SELECT first_name, last_name FROM users WHERE id = $1", [id])
        .then((result) => result.rows[0]);
}

module.exports = {
    createUser,
    getUserByEmail,
    createPasswordResetCode,
    getCodeByEmail,
    updatePassword,
    getImage,
    getUserById,
};
