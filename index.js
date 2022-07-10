const express = require("express");

require("dotenv").config();
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.get("/", async (req, res) => {
  res.json({ message: "testing " });
});
app.post("/send_mail", async (req, res) => {
  let { name, email, subject, message } = req.body;
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jsolomou79@gmail.com",
      pass: process.env.PASSWORD,
    },
  });

  await transport.sendMail(
    {
      from: email,
      // process.env.MAIL_FROM,
      to: "jsolomou79@gmail.com",
      subject: "email from your portfolio",
      html: `<div className="email">
    <h2>Portfolio email! From:${name}</h2>

    <p>Email:${email}</p>
    <p>subject:${subject}</P>
    <p>Message:${message}</p>

    <p>All the best,${name}</p>
     </div>
`,
    },
    (err) => {
      if (err) {
        console.log("there is an error", err);
      } else {
        console.log("email has sent!");
      }
    }
  );

  res.json({ message: "testing " });
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
