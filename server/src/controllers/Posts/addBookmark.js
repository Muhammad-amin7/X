import posts from "../../schema/posts.js";
import users from "../../schema/users.js";

export const addBookmark = async (req, res) => {
      const user = req.user;
      const postID = req.params.id

      try {
            if (!user || !postID) {
                  return res.status(400).json({ message: "User yoki postID topilmadi" });
            }

            const haveThisPost = await posts.findById(postID);
            if (!haveThisPost) {
                  return res.status(404).json({ message: "Post topilmadi" });
            }
            const hasBooked = user.bookmarks.some(bookmark => bookmark.post_id.toString() === postID);

            if (hasBooked) {
                  await users.findByIdAndUpdate(
                        user._id,
                        { $pull: { bookmarks: { post_id: postID } } },
                        { new: true }
                  );
            } else {
                  await users.findByIdAndUpdate(
                        user._id,
                        { $addToSet: { bookmarks: { post_id: postID } } },
                        { new: true }
                  );
            }

            return res.status(200).json({ ok: true, message: "Post bookmark qilindi", hasBooked: !hasBooked });
      } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Serverda xatolik yuz berdi" });
      }
};
