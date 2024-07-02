import mongoose, { Schema, Types } from "mongoose";
// Schema
// 1. Create an interface representing a document in MongoDB.
interface userType {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  posts: [Types.ObjectId];
}

const userSchema = new Schema<userType>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: "" },
    password: { type: String, required: true },
    posts: [{ type: Types.ObjectId, ref: "Post" }],
  },
  {
    timestamps: true,
  }
);

export const userModel = mongoose.model<userType>("User", userSchema);
