import mongoose from "mongoose";
import { User } from "../interfaces/users.interface";

const userSchema = new mongoose.Schema<User>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserModel = mongoose.model<User>("UserModel", userSchema);

export default UserModel;
