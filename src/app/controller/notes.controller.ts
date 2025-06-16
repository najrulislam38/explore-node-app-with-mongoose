import express, { Request, Response } from "express";
import Note from "../models/notes.model";

export const notesRoutes = express.Router();

notesRoutes.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find();

  res.status(200).json({
    success: true,
    message: "All notes show successfully",
    notes,
  });
});

notesRoutes.get("/:noteId", async (req: Request, res: Response) => {
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

notesRoutes.post("/create-note", async (req: Request, res: Response) => {
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

notesRoutes.patch(
  "/update-note/:noteId",
  async (req: Request, res: Response) => {
    const noteId = req.params.noteId;
    const updateNote = req.body;

    // update single data approach - 1 (Most use case)
    const note = await Note.findByIdAndUpdate(noteId, updateNote, {
      new: true,
    });

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
  }
);

notesRoutes.delete(
  "/delete-note/:noteId",
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
