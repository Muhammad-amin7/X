import posts from "../../schema/posts.js"

export const addComment = async (req, res) => {
      const UserID = req.user?._id
      const Message = req.body.message
      const PostID = req.body.postId


      try {
            if (!UserID || !Message || !PostID) {
                  return res.status(400).json({ error: "UserID, message yoki postId yetishmayapti" })
            }

            const post = await posts.findByIdAndUpdate(
                  PostID,
                  {
                        $push: {
                              comments: {
                                    userId: UserID,
                                    message: Message,
                                    created_at: new Date()
                              }
                        }
                  },
                  { new: true }
            )

            if (!post) {
                  return res.status(404).json({ error: "Post topilmadi" })
            }

            return res.status(200).json({ message: "Comment qo‘shildi", post })
      } catch (error) {
            console.error("Xatolik:", error)
            return res.status(500).json({ error: "Serverda xatolik" })
      }
}
