import users from "../../schema/users.js";

export const Profile = async (req, res) => {
      let userId, ownerId;

      if (req.params.id == "owner") {
            userId = req.user?._id;
            ownerId = req.user?._id;
      } else {
            userId = req.params.id;
            ownerId = req.user?._id;
      }

      console.log(userId);



      try {

            if (!userId) {
                  return res.status(400).send({ status: 400, message: "Bad request" });
            }

            const userinfo = await users.findOne({ _id: userId }, { provide: 0, bookmarks: 0, github_id: 0 }).lean();

            if (!userinfo) {
                  return res.status(404).send({ status: 404, message: "User not found" });
            }

            const isOwner = ownerId && userinfo._id.toString() === ownerId.toString();
            if (!isOwner) {
                  const followers = Array.isArray(userinfo.followers) ? userinfo.followers : [];
                  userinfo.hasFollowed = followers.some(f => f.user_id.toString() === ownerId.toString());
            }


            return res.send({
                  ok: true,
                  info: userinfo,
                  owner: isOwner
            });
      } catch (error) {
            console.error("Profile error:", error);
            return res.status(500).send({
                  status: 500,
                  message: "Internal Server Error"
            });
      }
};
