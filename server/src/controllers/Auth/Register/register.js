import users from "../../../schema/users.js"
import pendingUsers from "../../../schema/pendingUsers.js";
import { sendCodeToEmail } from "../../../utils/nodemailer.js";
import { codeVerification } from "../../../utils/randomVerificationCode.js";
import { createToken } from "../../../utils/createJsonWebTokken.js";


export const initialData = async (req, res) => {
      try {
            const { email, name, day, month, year } = req.body;
            const brithday = new Date(year, Number(month) - 1, day)


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

export const isUsedEmail = async (req, res) => {
      const { email } = req.body

      try {
            if (!email) return res.status(400).send({ status: 400, message: "Bad request" })
            const check = await users.findOne({ email: email })
            if (check) return res.send({ status: 409, message: "this user alredy existed" })
            return res.status(200).send({ status: 200, ok: true, message: "ok" })
      } catch (error) {
            console.error("Error in existingEmail:" + " " + error)
            res.status(500).send({ status: 500, message: "server error" })
      }
}


export const verifyEmail = async (req, res) => {
      const { code, email } = req.body

      try {

            if (!email || !code) {
                  return res.status(400).send({ status: 400, message: "Bad request" })
            }

            const findUser = await pendingUsers.findOne({ email })

            if (!findUser) {
                  return res.status(404).send({ status: 404, message: "User not found" })
            }


            if (findUser.code === Number(code)) {
                  return res.status(200).send({ ok: true, code: code })
            } else {
                  return res.send({ status: 401, message: "Incorrect code" })
            }

      } catch (error) {
            console.error("check Code In Email error:", error)
            return res.status(500).send({ status: 500, message: "Server error" })
      }
}




export const saveUser = async (req, res) => {
      const { email, password } = req.body;

      try {

            if (!email || !password) {
                  return res.status(400).json({ message: "Email va parol kerak." });
            }

            const otherDetails = await pendingUsers.findOne({ email: email });

            if (!otherDetails) {
                  return res.status(404).json({ message: "Foydalanuvchi topilmadi." });
            }


            const savedUser = await new users({
                  name: otherDetails.name,
                  password: password,
                  email: email,
                  bio: null,
                  photo: null,
                  joined_time: new Date(),
                  provide: "email",
                  birthday: otherDetails.birthday,
            }).save();

            const token = createToken({ id: savedUser._id })
            await pendingUsers.deleteOne({ email: email });

            return res.status(201).json({ ok: true, message: "Foydalanuvchi yaratildi", access_token: token });

      } catch (error) {
            console.error("Xatolik:", error);
            return res.status(500).json({ message: "Server xatosi" });
      }
};
