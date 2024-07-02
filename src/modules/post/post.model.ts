import mongoose, { Schema, Types } from "mongoose";
// Schema
// 1. Create an interface representing a document in MongoDB.
interface postType {
  title: string;
  content: string;
  author: Types.ObjectId;
  tags: [string];
  like: [Types.ObjectId];
  dislike: [Types.ObjectId];
}

const postSchema = new Schema<postType>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String, required: true }],
    like: [{ type: Schema.Types.ObjectId, ref: "User" }],
    dislike: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

export const postModel = mongoose.model<postType>("Post", postSchema);
