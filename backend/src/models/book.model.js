import mongoose from "mongoose";
import { bookConditionEnum, bookGenreEnum } from "../constants.js";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true,
    enum: bookGenreEnum
  },
  condition: {
    type: String,
    required: true,
    enum: bookConditionEnum
  },
  location: {
    type: String,
    required: true
  },
  publicationYear: {
    type: String
  },
  image: {
    type: String
  },
  externalURL: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);

