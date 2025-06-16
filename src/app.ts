import express, { Application, Request, Response } from "express";
import mongoose, { model } from "mongoose";

const app: Application = express();

// Middleware
app.use(express.json());

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, default: "" },
  category: {
    type: String,
    enum: ["personal", "work", "study", "others"],
    default: "personal",
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  tags: {
    label: { type: String, required: true },
    color: { type: String, default: "gray" },
  },
});

const Note = model("Note", noteSchema);

app.post("/notes/create-note", async (req: Request, res: Response) => {
  const body = req.body;
  // Approach - 1
  // const myNote = new Note({
  //   title: "learning node",
  //   tags: {
  //     label: "mongoose",
  //   },
  // });
  // await myNote.save();

  // Approach - 2
  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note,
  });
});

app.get("/notes", async (req: Request, res: Response) => {
  const notes = await Note.find();

  res.status(200).json({
    success: true,
    message: "All notes show successfully",
    notes,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the server.");
});

export default app;
