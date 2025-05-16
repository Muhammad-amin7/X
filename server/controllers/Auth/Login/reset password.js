import pendingUsers from "../../../schema/pendingUsers.js";
import { sendCodeToEmail } from "../../../utils/nodemailer.js";
import { codeVerification } from "../../../utils/randomVerificationCode.js";
import users from "../../../schema/users.js"
import { createToken } from "../../../utils/createJsonWebTokken.js"


export const sendCode = async (req, res) => {
      const { email } = req.params;
      console.log(email);


      try {
            const code = codeVerification();
            await sendCodeToEmail(email, code);
            console.log(email);


            await pendingUsers.updateOne(
                  { email },
                  { $set: { provide: "reset", code, } },
                  { upsert: true }
            );


            res.json({ ok: true, message: "Tasdiqlash kodi emailga yuborildi" });
      } catch (error) {
            console.error("Xatolik yuz berdi:", error);
            res.status(500).json({ message: "Serverda xatolik yuz berdi" });
      }
};


export const checkCode = async (req, res) => {
      const { email, code } = req.body

      try {
            if (!email || !code) return res.send({ ok: false, status: 400, message: "Bad request" })

            const data = await pendingUsers.findOne({ email: email, provide: 'reset' })

            if (Number(data.code) === Number(code)) return res.send({ ok: true, status: 200, message: "Succes" })
            return res.send({ ok: false, status: 409, message: "password is wrong" })
      } catch (error) {
            console.error("Error! Error in checkResetCode: " + error);
            return res.status(500).send({ status: 500, message: "server error" })
      }
}


export const setPassword = async (req, res) => {
      const { email, password } = req.body

      try {
            if (!password || !email) return res.status(400).send({ status: 400, message: "Bad reuest" })
            const find = users.findOneAndUpdate({ email: email }, { password: password })
            const token = createToken({ id: find._id })
            if (find) return res.send({ message: "password is success changed", access_token: token, ok: true, status: 200 })
            return res.status(404).send({ status: 404, message: "user not found" })
      } catch (error) {
            console.error(error);
            return res.status(500).send({ status: 500, message: "server error" })
      }
}