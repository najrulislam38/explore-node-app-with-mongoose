import mongoose, { model, Schema } from "mongoose";
import { NotesInterface } from "../interfaces/notes.interfaces";

const noteSchema = new mongoose.Schema<NotesInterface>(
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
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    }, // Reference to the user who created the note
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Note = model<NotesInterface>("Note", noteSchema);

export default Note;
