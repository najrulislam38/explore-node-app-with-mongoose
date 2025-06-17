import mongoose, { Model } from "mongoose";
import bcrypt from "bcrypt";

import {
  IAddress,
  User,
  UserInstanceMethods,
  UserStaticMethods,
} from "../interfaces/users.interface";
import validator from "validator";
import Note from "./notes.model";

const userAddressSchema = new mongoose.Schema<IAddress>(
  {
    city: String,
    street: String,
    zipcode: Number,
  },
  {
    _id: false,
  }
);

const userSchema = new mongoose.Schema<
  User,
  UserStaticMethods,
  UserInstanceMethods
>(
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
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [
        6,
        "Must be password length at least 6 character, got {VALUE}",
      ],
      select: false,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin", "superuser"],
        message: "role is not valid , got {VALUE}",
      },
      default: "superuser",
    },
    address: userAddressSchema,
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// instance methods
userSchema.method("hashPassword", async function (pass: string) {
  const password = await bcrypt.hash(pass, 10);
  return password;
});

// static methods
userSchema.static("hashPassword", async function (pass: string) {
  const password = await bcrypt.hash(pass, 10);
  return password;
});

// pre save hook / middleware

// document middleware
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  // console.log(this);
  next();
});

// query middleware
userSchema.pre("find", async function (next) {
  console.log("Inside the find hooks");
  next();
});

// post save hook / document middleware
userSchema.post("save", async function (doc, next) {
  console.log(`user ${doc.email} inserted successfully`);
  next();
});

// post hook / query middleware
userSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc) {
    console.log(doc);
    await Note.deleteMany({ user: doc._id });
  }

  next();
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const Users = mongoose.model<User, UserStaticMethods>("Users", userSchema);

export default Users;
