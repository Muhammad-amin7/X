import posts from "../../schema/posts.js";
import users from "../../schema/users.js";

export const allComments = async (req, res) => {
      const userId = req.user._id;
      const { limit } = req.params.limit;
      const id = req.params.id;

      try {

            const post = await posts.findById({ _id: id });

            if (!post) {
                  return res.status(404).send({ ok: false, message: "Post topilmadi" });
            }

            const returnFunc = async (comment) => {
                  const owner = await users.findById(comment.userId);
                  return {
                        owner: {
                              id: owner?._id,
                              photo: owner?.photo,
                              name: owner?.name,
                        },
                        comment,
                  };
            };

            const returns = await Promise.all(post.comments.map(returnFunc));
            return res.send({ ok: true, data: returns, postId: post._id });

      } catch (error) {
            console.error(error);
            return res.status(500).send({ ok: false, message: "Serverda xatolik yuz berdi" });
      }
};
