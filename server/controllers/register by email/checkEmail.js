import pendingUsers from "../../schema/pendingUsers.js"

export const siginCheckEmail = async (req, res) => {
      const { code, email } = req.body
      console.log(code, email);

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
                  return res.status(401).send({ status: 401, message: "Incorrect code" })
            }

      } catch (error) {
            console.error("check Code In Email error:", error)
            return res.status(500).send({ status: 500, message: "Server error" })
      }
}
