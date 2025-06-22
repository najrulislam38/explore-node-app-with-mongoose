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
exports.usersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_models_1 = __importDefault(require("../models/user.models"));
exports.usersRoutes = express_1.default.Router();
// const createValidationWithZod = z.object({
//   firstName: z.string(),
//   lastName: z.string(),
//   email: z.string(),
//   phone: z.string(),
//   age: z.number(),
//   role: z.string().optional(),
// });
exports.usersRoutes.post("/create-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const newUser = yield user_models_1.default.create(body);
        if (!newUser) {
            throw new Error("User provided data not valid.");
        }
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: newUser,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error,
        });
    }
}));
exports.usersRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_models_1.default.find();
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
}));
exports.usersRoutes.get("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get single data using Id
    const userId = req.params.userId;
    const user = yield user_models_1.default.findById(userId);
    // get single data using any field.
    const singleUser = yield user_models_1.default.findOne({ title: "Learning Mongoose" });
    res.status(200).json({
        success: true,
        message: "User show successfully",
        user,
    });
}));
exports.usersRoutes.patch("/update-user/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const body = req.body;
    const updateUser = yield user_models_1.default.findByIdAndUpdate(userId, body, {
        new: true,
    });
    res.status(201).json({
        success: true,
        message: "User info updated successfully",
        updateUser,
    });
}));
exports.usersRoutes.delete("/delete-user/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    // const deletedUser = await Users.findByIdAndDelete(userId);
    const deletedUser = yield user_models_1.default.findOneAndDelete({ _id: userId });
    res.status(200).json({
        success: true,
        message: "User deleted successfully",
        deletedUser,
    });
}));
