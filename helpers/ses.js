const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1",
});

function sendEmail(to, code) {
    return ses
        .sendEmail({
            Source: "Funky Chicken <fan.jersey@spicedling.email>",
            Destination: {
                ToAddresses: [to],
            },
            Message: {
                Body: {
                    Text: {
                        Data: `<p>Hello,</p>\n<p>Please insert this code <strong style="color: Blue">${code}</strong> in the input field and reset your password</p>\n<p>Best Regards,</p>\n<p>Your Team</p>`,
                    },
                },
                Subject: {
                    Data: "Reset your password",
                },
            },
        })
        .promise();
}

module.exports = { sendEmail };
