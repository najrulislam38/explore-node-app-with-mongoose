import express, { Request, Response } from "express";
import Users from "../models/user.models";

export const usersRoutes = express.Router();

usersRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const newUser = await Users.create(body);

    if (!newUser) {
      throw new Error("User provided data not valid.");
    }
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res.send(error);
  }
});

usersRoutes.get("", async (req: Request, res: Response) => {
  const users = await Users.find();

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

    const deletedUser = await Users.findByIdAndDelete(userId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deletedUser,
    });
  }
);
