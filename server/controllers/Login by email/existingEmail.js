import users from "../../schema/users.js"

export const checkLoginEmail = async (req, res) => {
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