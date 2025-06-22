import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: string,
      required: [true, "Phone number is required"],
    },
    role: {
      type: string,
      require: [true, "Role is required"],
      default: "member",
    },
    address: {
      type: string,
      require: [true, "Address is required"],
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
