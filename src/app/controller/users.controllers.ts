import express, { Request, Response } from "express";
import Users from "../models/user.models";
import { z } from "zod";

export const usersRoutes = express.Router();

// const createValidationWithZod = z.object({
//   firstName: z.string(),
//   lastName: z.string(),
//   email: z.string(),
//   phone: z.string(),
//   age: z.number(),
//   role: z.string().optional(),
// });

usersRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    // const zodBody = await createValidationWithZod.parseAsync(req.body);
    const body = req.body;

    // const password = await bcrypt.hash(body.password, 10);
    // console.log(password);

    // body.password = password;

    // instance method
    // const newUser = new Users(body);
    // const password = await newUser.hashPassword(body.password);

    // newUser.password = password;

    // await newUser.save();

    // static method
    // const password = await Users.hashPassword(body.password);
    // body.password = password;

    const newUser = await Users.create(body);

    if (!newUser) {
      throw new Error("User provided data not valid.");
    }

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

usersRoutes.get("/", async (req: Request, res: Response) => {
  const users = await Users.find();

  //filtering
  // const userEmail = req.query.email;
  // const users = await Users.find({ email: userEmail });

  // sorting
  // const users = await Users.find({}).sort({ email: 1 });
  // const users = await Users.find({}).sort({ email: -1 });
  // const users = await Users.find({}).sort({ firstName: "asc" });
  // const users = await Users.find({}).sort({ email: "ascending" });
  // const users = await Users.find({}).sort({ email: "desc" });
  // const users = await Users.find({}).sort({ fullName: "descending" });

  // skip
  // const users = await Users.find().skip(10);

  // limit
  // const users = await Users.find().limit(3);

  res.status(200).json({
    success: true,
    message: "All users show successfully",
    users,
  });
});

usersRoutes.get("/:userId", async (req: Request, res: Response) => {
  // get single data using Id
  const userId = req.params.userId;
  const user = await Users.findById(userId);

  // get single data using any field.
  const singleUser = await Users.findOne({ title: "Learning Mongoose" });

  res.status(200).json({
    success: true,
    message: "User show successfully",
    user,
  });
});

usersRoutes.patch(
  "/update-user/:userId",
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const body = req.body;

    const updateUser = await Users.findByIdAndUpdate(userId, body, {
      new: true,
    });

    res.status(201).json({
      success: true,
      message: "User info updated successfully",
      updateUser,
    });
  }
);

usersRoutes.delete(
  "/delete-user/:userId",
  async (req: Request, res: Response) => {
    const userId = req.params.userId;

    // const deletedUser = await Users.findByIdAndDelete(userId);
    const deletedUser = await Users.findOneAndDelete({ _id: userId });

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deletedUser,
    });
  }
);
