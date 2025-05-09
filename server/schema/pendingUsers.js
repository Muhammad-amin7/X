import mongoose from 'mongoose'

const pendingusers = mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, unique: true },
      provide: { type: String, default: 'email' },
      code: { type: Number },
      createAt: { type: Date, default: Date.now },
      birthday: { type: Date },
})

export default mongoose.models["pending users"] || mongoose.model("pending users", pendingusers)