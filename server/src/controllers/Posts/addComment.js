import posts from "../../schema/posts.js"

export const addComment = async (req, res) => {
      const UserID = req.user?._id
      const owner = req.user
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

            const data = {
                  owner: {
                        id: owner?._id,
                        photo: owner?.photo,
                        name: owner?.name,
                  },
                  comment: {
                        _id: post.comments[post.comments.length - 1]._id,
                        userId: UserID,
                        message: Message,
                        created_at: new Date()
                  }
            }

            return res.status(200).json({ ok: true, message: "Comment qo‘shildi", data: data, postId: post._id })
      } catch (error) {
            console.error("Xatolik:", error)
            return res.status(500).json({ ok: false, message: "Serverda xatolik" })
      }
}
