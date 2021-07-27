const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const uidSafe = require("uid-safe");

const diskStorage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, path.join(__dirname, "..", "server", "uploads"));
    },
    filename: function (request, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

app.use(express.static(path.join(__dirname, "/uploads")));
app.use(express.urlencoded({ extended: false }));

module.exports = uploader;
