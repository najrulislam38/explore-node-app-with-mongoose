"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const notes_model_1 = __importDefault(require("../models/notes.model"));
exports.notesRoutes = express_1.default.Router();
exports.notesRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield notes_model_1.default.find().populate("user");
    res.status(200).json({
        success: true,
        message: "All notes show successfully",
        notes,
    });
}));
exports.notesRoutes.get("/:noteId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noteId = req.params.noteId;
        const note = yield notes_model_1.default.findById(noteId).populate("user");
        res.status(200).json({
            success: true,
            message: "note show successfully",
            note,
        });
        // get single data using any field.
        // const singleNote = await Note.findOne({ title: "Learning Mongoose" });
        // res.status(200).json({
        //   success: true,
        //   message: "note show successfully",
        //   note: singleNote,
        // });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error,
        });
    }
}));
exports.notesRoutes.post("/create-note", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const note = yield notes_model_1.default.create(body);
    res.status(201).json({
        success: true,
        message: "Note created successfully",
        note,
    });
}));
exports.notesRoutes.patch("/update-note/:noteId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.noteId;
    const updateNote = req.body;
    // update single data approach - 1 (Most use case)
    const note = yield notes_model_1.default.findByIdAndUpdate(noteId, updateNote, {
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
}));
exports.notesRoutes.delete("/delete-note/:noteId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.noteId;
    const body = req.body;
    // use 3 way to delete data.
    const note = yield notes_model_1.default.findByIdAndDelete(noteId);
    const note2 = yield notes_model_1.default.findOneAndDelete({ _id: noteId });
    const note3 = yield notes_model_1.default.deleteOne({ _id: noteId });
    res.status(200).json({
        success: true,
        message: "data deleted successfully",
        note3,
    });
}));
