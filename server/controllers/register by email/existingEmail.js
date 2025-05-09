import users from "../../schema/users.js"

export const existingEmail = async (req, res) => {
      const { email } = req.body

      try {
            if (!email) return res.status(400).send({ status: 400, message: "Bad request" })
            const check = await users.findOne({ email: email })
            if (check) return res.send({ status: 409, message: "this user alredy existed" })
            return res.status(200).send({ status: 200, ok: true, message: "Bad request" })
      } catch (error) {
            console.error("Error in existingEmail:" + " " + error)
            res.status(500).send({ status: 500, message: "server error" })
      }
}