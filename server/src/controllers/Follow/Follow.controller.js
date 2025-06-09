import users from "../../schema/users.js";
import mongoose from "mongoose";

export const follow = async (req, res) => {
      console.log("Follow request received");

      const targetUserId = req.params.id;
      const currentUser = req.user;

      if (!mongoose.Types.ObjectId.isValid(targetUserId) || !mongoose.Types.ObjectId.isValid(currentUser._id)) {
            return res.status(400).json({ error: "Invalid user ID" });
      }

      if (targetUserId === currentUser._id.toString()) {
            return res.status(400).json({ error: "You cannot follow yourself" });
      }

      try {
            const alreadyFollowing = await users.findOne({
                  _id: currentUser._id,
                  "following.user_id": targetUserId
            });

            if (alreadyFollowing) {
                  // Unfollow
                  await Promise.all([
                        users.updateOne({ _id: currentUser._id }, { $pull: { following: { user_id: targetUserId } } }),
                        users.updateOne({ _id: targetUserId }, { $pull: { followers: { user_id: currentUser._id } } })
                  ]);

                  return res.status(200).json({
                        ok: true,
                        message: "Unfollowed successfully",
                        userId: targetUserId,
                        ownerId: currentUser._id,
                        hasFollowing: false
                  });
            } else {
                  // Follow
                  await Promise.all([
                        users.updateOne({ _id: currentUser._id }, { $push: { following: { user_id: targetUserId } } }),
                        users.updateOne({ _id: targetUserId }, { $push: { followers: { user_id: currentUser._id } } })
                  ]);

                  return res.status(200).json({
                        ok: true,
                        message: "Followed successfully",
                        userId: targetUserId,
                        ownerId: currentUser._id,
                        hasFollowing: true
                  });
            }
      } catch (error) {
            console.error("Error in follow route:", error);
            return res.status(500).json({ error: "Internal server error" });
      }
};
