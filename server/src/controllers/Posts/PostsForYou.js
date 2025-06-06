import posts from "../../schema/posts.js";
import users from "../../schema/users.js";
import { postFormater } from "../../utils/PostFormater.js";

export const PostsForYou = async (req, res) => {
      try {
            const owner = req.user;
            const limit = parseInt(req.params.limit, 10);
            console.log(limit + "keldi");


            const allPosts = await posts.find({}).lean().limit(limit > 0 ? limit : 100);
            console.log(allPosts.length + " post topildi");


            const filteredPosts = allPosts
                  .filter(post => new Date(post.created_at).getTime() >= Date.now() - 7 * 24 * 60 * 60 * 1000)
                  .sort((a, b) => {
                        const scoreA = a.likes.length + a.shows.length + a.comments.length;
                        const scoreB = b.likes.length + b.shows.length + b.comments.length;
                        return scoreB - scoreA;
                  });

            const send = await postFormater(filteredPosts, owner);

            return res.status(200).send({ ok: true, data: send });
      } catch (error) {
            console.error("Error in PostsForYou:", error);
            return res.status(500).json({ error: "Server error" });
      }
}