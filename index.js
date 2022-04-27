const express = require("express");
const app = express();
require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.post("/send_mail", cors(), async (req, res) => {
  let { text } = req.body;
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transport.sendMail({
    from: process.env.MAIL_FROM,
    to: "solomoufam@yahoo.com",
    subject: "test email",
    html: `<div className="email">
    <h2>Here is your email!</h2>
    <p>${text}</p>

    <p>All the best, Darwin</p>
     </div>
`,
  });
});

app.listen(process.env.Port || 4000, () => {
  console.log("server is listening on port 4000");
});
