"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortUrl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const nanoid_1 = require("nanoid");
const nanoid = (0, nanoid_1.customAlphabet)("abcde098765", 6);
const urlSchema = new mongoose_1.default.Schema({
    shortId: {
        type: String,
        unique: true,
        required: true,
        default: () => nanoid(6),
    },
    destination: { type: String, required: true },
    clicks: { type: Number, required: true, default: 0 },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    customAlias: {
        type: String,
        unique: true,
        sparse: true, // Allows null values (useful for unique constraints)
    },
});
exports.shortUrl = mongoose_1.default.model('shortUrl', urlSchema);
