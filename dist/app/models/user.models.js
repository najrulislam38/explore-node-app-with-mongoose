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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const notes_model_1 = __importDefault(require("./notes.model"));
const userAddressSchema = new mongoose_1.default.Schema({
    city: String,
    street: String,
    zipcode: Number,
}, {
    _id: false,
});
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
        minlength: [3, "Must be first length at least 3 character, got {VALUE}"],
        maxlength: 10,
    },
    lastName: { type: String, required: true, trim: true },
    age: {
        type: Number,
        required: true,
        min: [18, "Must be age at least 18, got {VALUE}"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"],
        lowercase: true,
        trim: true,
        //custom validation
        // validate: {
        //   validator: function (value) {
        //     return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
        //   },
        //   message: (props) => `${props.value} is not valid email address`,
        // },
        validate: [validator_1.default.isEmail, "Invalid email sent {VALUE} "],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [
            6,
            "Must be password length at least 6 character, got {VALUE}",
        ],
        select: false,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: {
            values: ["user", "admin", "superuser"],
            message: "role is not valid , got {VALUE}",
        },
        default: "superuser",
    },
    address: userAddressSchema,
}, {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
// hook / middleware method
// instance methods
userSchema.method("hashPassword", function (pass) {
    return __awaiter(this, void 0, void 0, function* () {
        const password = yield bcrypt_1.default.hash(pass, 10);
        return password;
    });
});
// static methods
userSchema.static("hashPassword", function (pass) {
    return __awaiter(this, void 0, void 0, function* () {
        const password = yield bcrypt_1.default.hash(pass, 10);
        return password;
    });
});
// pre save hook / middleware
// document middleware
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, 10);
        // console.log(this);
        next();
    });
});
// query middleware
userSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Inside the find hooks");
        next();
    });
});
// post save hook / document middleware
userSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`user ${doc.email} inserted successfully`);
        next();
    });
});
// post hook / query middleware
userSchema.post("findOneAndDelete", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc) {
            console.log(doc);
            yield notes_model_1.default.deleteMany({ user: doc._id });
        }
        next();
    });
});
userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});
const Users = mongoose_1.default.model("Users", userSchema);
exports.default = Users;
