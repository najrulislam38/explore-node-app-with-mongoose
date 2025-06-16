import express, { Application, Request, Response } from "express";
import mongoose, { model } from "mongoose";
import { notesRoutes } from "./app/controller/notes.controller";
import { usersRoutes } from "./app/controller/users.controllers";

const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.use("/notes", notesRoutes);
app.use("/users", usersRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the server.");
});

export default app;
