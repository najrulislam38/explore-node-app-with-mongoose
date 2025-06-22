"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notes_controller_1 = require("./app/controller/notes.controller");
const users_controllers_1 = require("./app/controller/users.controllers");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/notes", notes_controller_1.notesRoutes);
app.use("/users", users_controllers_1.usersRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to the server.");
});
exports.default = app;
