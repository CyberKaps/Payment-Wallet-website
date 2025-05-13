import { kMaxLength } from "buffer";
import mongoose, { model, mongo } from "mongoose";
import dotenv from "dotenv";
import { number } from "zod";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
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

export const User = mongoose.model("User", userSchema);

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
   balance: {
    type: Number,
    required: true
  }
})

export const Account = mongoose.model("Account", accountSchema);

