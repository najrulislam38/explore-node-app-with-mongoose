import express, { Application, Request, Response } from "express";
import mongoose, { model } from "mongoose";

const app: Application = express();

// Middleware
app.use(express.json());

const noteSchema = new mongoose.Schema(
  {
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

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

app.get("/notes/:noteId", async (req: Request, res: Response) => {
  // get single data using Id
  const noteId = req.params.noteId;
  const note = await Note.findById(noteId);

  // get single data using any field.
  const singleNote = await Note.findOne({ title: "Learning Mongoose" });

  res.status(200).json({
    success: true,
    message: "note show successfully",
    note: singleNote,
  });
});

app.patch("/notes/update-note/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const updateNote = req.body;

  // update single data approach - 1 (Most use case)
  const note = await Note.findByIdAndUpdate(noteId, updateNote, { new: true });

  // update single data approach - 2
  // const note = await Note.findOneAndUpdate({ _id: noteId }, updateNote, {
  //   new: true,
  // });

  // update single data approach - 3 low uses
  // const note = await Note.updateOne({ _id: noteId }, updateNote, {
  //   new: true,
  // });

  res.status(200).json({
    success: true,
    message: "note update successfully",
    note,
  });
});

app.delete(
  "/notes/delete-note/:noteId",
  async (req: Request, res: Response) => {
    const noteId = req.params.noteId;
    const body = req.body;

    // use 3 way to delete data.
    const note = await Note.findByIdAndDelete(noteId);
    const note2 = await Note.findOneAndDelete({ _id: noteId });
    const note3 = await Note.deleteOne({ _id: noteId });

    res.status(200).json({
      success: true,
      message: "data deleted successfully",
      note3,
    });
  }
);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the server.");
});

export default app;
