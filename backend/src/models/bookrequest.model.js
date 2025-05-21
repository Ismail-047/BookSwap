import mongoose from "mongoose";

const { Schema, model } = mongoose;

const bookRequestSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true
  },
  requester: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  message: {
    type: String,
    required: false
  }
}, { timestamps: true });

export const BookRequest = model("BookRequest", bookRequestSchema);
