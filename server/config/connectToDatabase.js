import mongoose from "mongoose";

export const connectToDatabase = async () => {
      try {
            await mongoose.connect(process.env.MONGOOSE_URI)
            console.log("✅ SUCCESS! Mongoose connected")
      } catch (error) {
            console.error(`❌ ERROR! Mongoose has an error. Error: ${error}`)
      }
}