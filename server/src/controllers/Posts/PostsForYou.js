import posts from "../../schema/posts.js";
import users from "../../schema/users.js";

export const PostsForYou = async (req, res) => {

      try {
            const owner = req.user;
            const limit = parseInt(req.params.limit, 10);

            const allPosts = await posts.find({}).lean();

            const filteredPosts = allPosts
                  .filter(post => new Date(post.created_at).getTime() >= Date.now() - 7 * 24 * 60 * 60 * 1000)
                  .sort((a, b) => {
                        const scoreA = a.likes.length + a.shows.length + a.comments.length;
                        const scoreB = b.likes.length + b.shows.length + b.comments.length;
                        return scoreB - scoreA;
                  });
            const send = await Promise.all(
                  (limit > 0 ? filteredPosts.slice(0, limit) : filteredPosts).map(async (post) => {
                        const postOwner = await users.findById(post.owner).lean();
                        const hasLiked = post.likes.some(value => value.userId.toString() === owner._id.toString())
                        return {
                              owner: {
                                    photo: postOwner?.photo,
                                    name: postOwner?.name,
                                    username: postOwner?.username,
                                    id: postOwner?._id
                              },
                              content: { ...post, isLiked: hasLiked, likes: post.likes.length, comments: post.comments.length, shows: post.shows.length }
                        };
                  })
            );

            return res.status(200).send({ ok: true, contents: send });
      } catch (error) {
            console.error("Error in PostsForYou:", error);
            return res.status(500).json({ error: "Server error" });
      }
};
