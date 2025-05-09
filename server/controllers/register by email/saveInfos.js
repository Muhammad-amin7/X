import pendingUsers from "../../schema/pendingUsers.js";
import users from "../../schema/users.js";
import { sendCodeToEmail } from "../../utils/nodemailer.js";
import { codeVerification } from "../../utils/randomVerificationCode.js";


export const siginSaveInfo = async (req, res) => {
      try {
            const { email, name, day, month, year } = req.body;
            const brithday = new Date(year, Number(month) - 1, day)
            console.log(brithday);


            if (!email || !name) {
                  return res.status(400).send({ ok: false, message: "bad request" });
            }

            const userExists = await users.findOne({ email: email });
            if (userExists) {
                  return res.status(409).send({ ok: false, message: "user already registered" });
            }

            const verificationCode = codeVerification();
            sendCodeToEmail(email, verificationCode)

            await pendingUsers.findOneAndUpdate(
                  { email },
                  { name, email, code: verificationCode, brithday: brithday },
                  { upsert: true, new: true }
            );

            return res.status(200).send({
                  ok: true,
                  email: email,
                  message: "verification code sent"
            });

      } catch (err) {
            console.error("❌ Error! Register User error:", err);
            return res.status(500).send({ ok: false, message: "serverError" });
      }
};
