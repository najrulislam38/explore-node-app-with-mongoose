import mongoose from "mongoose";
import { User } from "../interfaces/users.interface";
import validator from "validator";

const userSchema = new mongoose.Schema<User>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
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
      required: [true, "email is required"],
      lowercase: true,
      trim: true,
      //custom validation
      // validate: {
      //   validator: function (value) {
      //     return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      //   },
      //   message: (props) => `${props.value} is not valid email address`,
      // },
      validate: [validator.isEmail, "Invalid email sent {VALUE} "],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin", "superuser"],
        message: "role is not valid , got {VALUE}",
      },
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
