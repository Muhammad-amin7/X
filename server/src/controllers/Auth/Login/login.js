import users from "../../../schema/users.js"
import { createToken } from "../../../utils/createJsonWebTokken.js"

export const isValidEmail = async (req, res) => {
      const { email } = req.body
      try {
            if (!email) return res.status(400).send({ status: 400, message: "Bad request" })
            const check = await users.findOne({ email: email })

            if (check) return res.send({ status: 200, ok: true, email: email })
            return res.send({ status: 409, message: "this email not defined" })
      } catch (error) {
            console.error("Error in existingEmail:" + " " + error)
            res.status(500).send({ status: 500, message: "server error" })
      }
}


export const checkPassword = async (req, res) => {
      const { email, password } = req.body

      try {
            if (!email || !password) return res.send({ message: "Bad request", status: 400 })
            const user = await users.findOne({ email: email })
            if (user.password === password) {
                  const token = createToken({ id: user._id })
                  return res.send({ ok: true, message: "success logined", status: 200, access_token: token })
            }
            return res.send({ message: "Password is wrong", status: 401 })

      } catch (error) {

      }
}