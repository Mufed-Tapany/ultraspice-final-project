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
