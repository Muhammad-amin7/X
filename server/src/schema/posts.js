import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
      message: { type: String, required: true },
      created_at: { type: Date, default: Date.now }
})

const POSTS = new mongoose.Schema({
      owner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
      message: { type: String, required: true },
      image: { type: String },
      created_at: { type: Date, default: Date.now },

      likes: [{
            userId: { type: String, required: true },
      }],

      shows: [{
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
      }],

      comments: [commentSchema]
})

export default mongoose.models.Post || mongoose.model("Post", POSTS)
