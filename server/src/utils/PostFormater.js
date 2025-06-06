import users from "../schema/users.js";

export const postFormater = async (posts, owner) => {
      const send = await Promise.all(
            posts.map(async (post) => {
                  const postOwner = await users.findById(post.owner).lean();

                  const hasLiked = post.likes.some(value => value.userId.toString() === owner._id.toString());

                  return {
                        owner: {
                              photo: postOwner?.photo,
                              name: postOwner?.name,
                              username: postOwner?.username || "null",
                              id: postOwner?._id,
                        },
                        content: {
                              ...post,
                              isLiked: hasLiked,
                              likes: post.likes.length,
                              comments: post.comments.length,
                              shows: post.shows.length,
                              creator: postOwner._id.toString() == owner._id.toString()
                        },
                  };
            })
      );
      return send;
}
