import users from "../../schema/users.js";

export const Profile = async (req, res) => {
      const userId = req.params.id && req.params.id !== "undefined" ? req.params.id : req.user?.id
      const ownerId = req.user?.id;

      try {

            if (!userId) {
                  return res.status(400).send({ status: 400, message: "Bad request" });
            }

            const userinfo = await users.findOne({ _id: userId });

            if (!userinfo) {
                  return res.status(404).send({ status: 404, message: "User not found" });
            }

            const isOwner = ownerId && userinfo._id.toString() === ownerId.toString();

            return res.send({
                  ok: true,
                  info: userinfo,
                  change: isOwner
            });
      } catch (error) {
            console.error("Profile error:", error);
            return res.status(500).send({
                  status: 500,
                  message: "Internal Server Error"
            });
      }
};
