import users from "../../schema/users.js"
import { createToken } from "../../utils/createJsonWebTokken.js"

export const checkLoginPass = async (req, res) => {
      const { email, password } = req.body
      console.log(email, password);

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