import mongoose from 'mongoose'

const USERS = mongoose.Schema({
      name: { type: String, required: true },
      password: { type: String, minlength: 8 },
      email: { type: String, unique: true },
      bio: { type: String },
      photo: { type: String },
      joined_time: { type: Date, required: true, default: Date.now },
      provide: { type: String, default: 'email' },
      brithday: { type: Date },
      github_id: { type: String },
      photo_background: { type: String },
      bookmarks: [{
            post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }
      }],
      followers: [{
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }
      }],
      following: [{
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }
      }]
})

export default mongoose.models["users"] || mongoose.model("users", USERS)