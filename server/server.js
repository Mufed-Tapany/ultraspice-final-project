const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const path = require("path");
const csurf = require("csurf");
const { hashPassword } = require("../helpers/hashPassword");
const { login } = require("../helpers/login");
const { s3upload } = require("../helpers/s3");
const uploader = require("../helpers/upload");
const { sendEmail } = require("../helpers/ses");
const crypto = require("crypto-random-string");
const {
    createUser,
    getUserByEmail,
    createPasswordResetCode,
    getCodeByEmail,
    updatePassword,
    createImage,
    getUserById,
    createOrder,
    getUserOrders,
} = require("../database/db");

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

app.get("/api/user/id.json", function (request, response) {
    response.json({
        userId: request.session.userId,
    });
});

app.post("/api/register", (request, response) => {
    const { first_name, last_name, email, password } = request.body;
    const usedEmail =
        "This Email Address is already used, please register with another one";

    hashPassword(password).then((password_hash) => {
        return createUser({ first_name, last_name, email, password_hash })
            .then((user) => {
                console.log("userId", user.id);
                request.session.userId = user.id;
                console.log(request.session.userId);
                response.json(user);
            })
            .catch((error) => {
                // if the user entered an existing (used email) email
                if (error.constraint === "users_email_key") {
                    console.log("ERROR:email exist", error);
                    // show error message
                    response.json({ error_message: usedEmail });
                    return;
                }
                console.log("[ERROR:createUser]", error);
            });
    });
});

app.post("/api/login", (request, response) => {
    const { email, password } = request.body;
    login(email, password)
        .then((user) => {
            request.session.userId = user.id;
            response.json(user);
        })
        .catch((error) => {
            console.log("[/api/login:error]", error);
            response.statusCode = 400;
            response.json({
                error: "Wrong credentials",
            });
        });
});

app.post("/password/reset/start", (request, response) => {
    const { email } = request.body;
    const code = crypto({ length: 6, type: "alphanumeric" });
    getUserByEmail(email)
        .then((realUser) => {
            if (!realUser) {
                console.log("ERROR not real user");
                response.statusCode = 400;
                response.json({ message: "User not found!" });
                return;
            }
            createPasswordResetCode({ email, code })
                .then(() => {
                    sendEmail(email, code);
                    console.log("Code", code);
                    response.json({ message: "Ok" });
                })
                .catch((error) => {
                    console.log("ERROR:createPasswordResetCode", error);
                    response.statusCode = 500;
                });
        })
        .catch((error) => {
            console.log("ERROR:getUserByEmail", error);
            response.statusCode = 500;
        });
});

app.post("/password/reset/verify", (request, response) => {
    const { email, password, code } = request.body;
    getCodeByEmail({ email, code }).then((data) => {
        if (!data) {
            console.log("Error");
            response.json({ message: "No code found!" });
        }
        if (data.code == request.body.code) {
            updatePassword({ password, email })
                .then(() => {
                    console.log("RESET:successfull");
                    response.json({ message: "successfull" });
                })
                .catch((error) => {
                    console.log("ERROR:/password/reset/verify", error);
                    response.statusCode = 500;
                });
        }
    });
});

app.post("/orders", (request, response) => {
    const { userId } = request.session;
    console.log("request.body", request.body);
    const imageId = request.body.image.id;
    console.log("image", imageId);
    const {
        shipping_first_name,
        shipping_last_name,
        street,
        plz,
        city,
        size,
        color,
        quantity,
    } = request.body;
    const { x, y } = request.body.position;

    console.log("X-Dime", x);
    console.log("Y-Dime", y);
    createOrder({
        userId,
        imageId,
        shipping_first_name,
        shipping_last_name,
        street,
        plz,
        city,
        size,
        color,
        quantity,
        x,
        y,
    })
        .then((order) => {
            response.json(order);
        })
        .catch((error) => {
            console.log("ERROR:createOrder", error);
        });

    response.json("hello");
});

app.get("/api/user", (request, response) => {
    const { userId } = request.session;
    if (userId) {
        return getUserById(userId)
            .then((user) => {
                console.log("user", user);
                console.log("id", user.id); // undefined
                response.json({
                    ...user,
                });
            })
            .catch((error) => {
                console.log("[ERROR:getUserById]", error);
                response.statusCode = 500;
            });
    }
    response.json({ message: "No user logged in currently" });
});

app.post(
    "/api/upload_picture",
    uploader.single("file"),
    s3upload,
    (request, response) => {
        const { userId } = request.session;
        const { filename } = request.file;
        console.log("userId", userId);
        const image = `https://s3.amazonaws.com/spicedling/${filename}`;

        createImage({ userId, image })
            .then((data) => {
                console.log("[updateImage]", data);
                response.json({ ...data });
            })
            .catch((error) => {
                console.log("[ERROR:updateImage]", error);
                response.json({ message: "Error while updating user" });
            });
    }
);

app.get("/api/orders", (request, response) => {
    const id = request.session.userId;
    getUserOrders(id).then((order) => {
        response.json(order);
    });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
