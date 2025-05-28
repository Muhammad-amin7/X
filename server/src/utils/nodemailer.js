import nodemailer from 'nodemailer'

export const sendCodeToEmail = async (email, code) => {
      try {
            const transporter = nodemailer.createTransport({
                  service: "gmail",
                  auth: {
                        user: process.env.GOOGLE_APP_EMAIL,
                        pass: process.env.GOOGLE_APP_PASSWORD,
                  },
            });

            const message = {
                  from: `"X App" ${process.env.GOOGLE_APP_EMAIL}`,
                  to: email,
                  subject: "X - Email Verification Code",
                  html: `
        <p>Hello,</p>
        <p>Your verification code is:</p>
        <h2>${code}</h2>
        <p>This code will expire in 2 minutes.</p>
      `,
            };

            await transporter.sendMail(message);
      } catch (error) {
            console.error("❌ Failed to send email:", error.message);
            throw error; // muammoni tashqariga otkazish
      }
};
