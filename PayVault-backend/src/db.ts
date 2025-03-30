import { kMaxLength } from "buffer";
import mongoose, { model } from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
connectDB();


const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true, unique: true, minLength: 3, MaxLength: 20},
    password: {type: String, required: true, minLength: 6},
})

const userModel = mongoose.model("User", userSchema);


module.exports = { userModel };