const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_PASSWORD,
  },
});

async function sendEmail(to, subject, message) {
  try {
    const recipient = to;
    const topic = subject;
    const emailMessage = message;
    if (!to) {
      return res.status(201).json("Missing email");
    } else if (!subject) {
      return res.status(201).json("Missing subject");
    } else if (!message) {
      return res.status(201).json("Missing message");
    }

    transporter.sendMail(
      {
        from: process.env.GOOGLE_EMAIL,
        to: recipient,
        subject: topic,
        text: emailMessage,
      },
      (err, info) => {
        if (err) console.error(err);
        else console.log("Email sent: ", info.response);
      }
    );
  } catch (error) {
    console.error(error);
    res.error(error);
  }
}

module.exports = sendEmail;
