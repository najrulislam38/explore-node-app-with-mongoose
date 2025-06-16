import mongoose from "mongoose";
import { User } from "../interfaces/users.interface";

const userSchema = new mongoose.Schema<User>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Must be first length at least 3 character, got {VALUE}"],
      maxlength: 10,
    },
    lastName: { type: String, required: true, trim: true },
    age: {
      type: Number,
      required: true,
      min: [18, "Must be age at least 18, got {VALUE}"],
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superuser"],
      default: "superuser",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Users = mongoose.model<User>("Users", userSchema);

export default Users;
