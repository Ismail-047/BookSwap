import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["book_owner", "book_seeker", "both"],
      default: "both",
    },
    wishlist: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },],
    sentRequests: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookRequest",
    },],
    receivedRequests: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookRequest",
    },],
    reviews: [{
      reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        maxlength: 500,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },],
    isOnline: {
      type: Boolean,
      default: false,
    },
    notifications: {
      wishlistMatch: {
        type: Boolean,
        default: true,
      },
    },
    isUserVerified: {
      type: Boolean,
      default: false
    },
    emailVerificationCode: String,
    verificationCodeExpiresAt: Date,
    resetPassToken: String,
    resetPassTokenExpiresAt: Date,

  }, { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcryptjs.hash(this.password, 10);
    }
    if (this.isModified("emailVerificationCode")) {
      this.emailVerificationCode = await bcryptjs.hash(this.emailVerificationCode, 10);
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcryptjs.compare(enteredPassword, this.password);
};

userSchema.methods.compareVerificationCode = async function (enteredCode) {
  return bcryptjs.compare(enteredCode, this.emailVerificationCode);
};

export const User = mongoose.model("User", userSchema);



