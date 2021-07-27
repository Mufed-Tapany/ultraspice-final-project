const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const path = require("path");
const csurf = require("csurf");

app.use(compression());

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
}

// middleware for request.body (multipart)
app.use(express.urlencoded({ extended: false }));
// middleware for request.body (json)
app.use(express.json());

// set cookies-session
app.use(
    cookieSession({
        secret: secrets.COOKIES_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(csurf());

app.use(function (request, response, next) {
    response.cookie("mytoken", request.csrfToken());
    next();
});

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
