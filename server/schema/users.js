import mongoose from 'mongoose'

const USERS = mongoose.Schema({
      name: { type: String, required: true },
      password: { type: String, minlength: 8 },
      email: { type: String, unique: true },
      bio: { type: String },
      photo: { type: String },
      joined_time: { type: Date, required: true, default: Date.now },
      provide: { type: String, default: 'email' },
      brithday: { type: Date }
})

export default mongoose.models["users"] || mongoose.model("users", USERS)