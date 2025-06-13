import posts from "../../schema/posts.js";
import { postFormater } from "../../utils/PostFormater.js";

export const postFollowings = async (req, res) => {
      console.log("postFollowings called");

      const owner = req.user;
      console.log(owner);

      const limit = parseInt(req.params.limit, 10) || 10;
      console.log(limit);

      try {
            const followingUsers = owner.following || [];
            const followingIds = followingUsers.map(user => user.user_id);

            if (followingIds.length === 0) {
                  return res.status(200).send([]);
            }

            const send = await posts.find({ owner: { $in: followingIds } }).sort({ created_at: -1 }).limit(limit).lean();
            const formattedPosts = await postFormater(send, owner);

            return res.status(200).send({ ok: true, posts: formattedPosts, limit: limit});
      } catch (error) {
            console.error("Error in postFollowings:", error);
            return res.status(500).send({ error: "Internal server error" });
      }
}
