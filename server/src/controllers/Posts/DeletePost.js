import posts from "../../schema/posts.js";

export const deletePost = async (req, res) => {
      const postID = req.params.id;
      const userID = req.user._id;

      try {
            if (!postID || !userID) {
                  return res.status(400).send({ ok: false, message: "Missing post ID or user ID" });
            }

            const post = await posts.findById(postID);
            if (!post) {
                  return res.status(404).send({ ok: false, message: "Post not found" });
            }

            if (post.owner.toString() !== userID.toString()) {
                  return res.status(403).send({ ok: false, message: "Access denied: not your post" });
            }

            await posts.deleteOne({ _id: postID });

            return res.status(200).send({ ok: true, message: "Post deleted successfully", _id: postID });
      } catch (error) {
            console.error("Delete post error:", error);
            return res.status(500).send({ ok: false, message: "Server error" });
      }
};
