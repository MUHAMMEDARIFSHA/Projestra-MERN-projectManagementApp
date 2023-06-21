const nodemailer = require('nodemailer');

const verifyEmail = async (email, link) => {
  console.log("verify email in function");
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass:process.env.EMAIL_PASS
      }
    });

    let info = await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Account verification",
      text: "Verify",
      html: `
        <div>
          <a href="${link}">Click the link to verify your email</a>
        </div>
      `
    });

    console.log("Mail sent successfully");
  } catch (error) {
    console.log(error, "Mail failed to send");
  }
};

module.exports = verifyEmail;
