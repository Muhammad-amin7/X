import posts from "../../schema/posts.js";

export const AddLike = async (req, res) => {
      const userId = req.user._id;
      const postId = req.params.id;

      try {
            const post = await posts.findById(postId).lean();
            if (!post) return res.status(404).json({ message: "Post topilmadi" });

            const hasLiked = post.likes.some(
                  like => like.userId.toString() === userId.toString()
            );

            const update = hasLiked
                  ? { $pull: { likes: { userId: userId } } }
                  : { $addToSet: { likes: { userId: userId } } };

            const updatedPost = await posts.findByIdAndUpdate(postId, update, { new: true });

            res.status(200).json({
                  message: hasLiked ? "Unlike qilindi" : "Like qilindi",
                  ok: true,
                  liked: !hasLiked,
                  likes: updatedPost.likes.length,
            });

      } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server xatosi" });
      }
};
