import posts from "../../schema/posts.js";
import users from "../../schema/users.js";

export const bookmarks = async (req, res) => {
      const owner = req.user;
      const bookmarks = req.user.bookmarks;

      try {
            if (!bookmarks || bookmarks.length === 0) {
                  return res.status(200).json({ message: "No bookmarks found", contents: [] });
            }

            const send = await Promise.all(
                  bookmarks.map(async (bookmark) => {
                        const post = await posts.findById(bookmark.post_id).lean();
                        if (!post) return null;

                        const postOwner = await users.findById(post.owner).lean();
                        const hasLiked = post?.likes?.some(value => value.userId.toString() === owner._id.toString());

                        return {
                              owner: {
                                    photo: postOwner?.photo,
                                    name: postOwner?.name,
                                    username: postOwner?.username,
                                    id: postOwner?._id,
                              },
                              content: {
                                    ...post,
                                    isLiked: hasLiked,
                                    likes: post.likes.length,
                                    comments: post.comments.length,
                                    shows: post.shows.length,
                                    creator: postOwner._id.toString() === owner._id.toString(),
                                    hasBooked: true
                              },
                        };
                  })
            );

            const filtered = send.filter(item => item !== null);

            return res.status(200).send({ ok: true, contents: filtered });
      } catch (error) {
            console.error("Error fetching bookmarks:", error);
            return res.status(500).json({ message: "Internal server error" });
      }
};
