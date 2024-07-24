import mongoose, { Document } from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcde098765", 6)




export interface shortURL extends Document {
    shortId: string
    destination: string
    customAlias?: string;
    clicks: number;
    user: mongoose.Schema.Types.ObjectId; // Reference to User model


}

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        unique: true,
        required: true,
        default: () => nanoid(6),
    },
    destination: { type: String, required: true },
    clicks: { type: Number, required: true, default: 0 },
    //user: { type: String, required: true }, // Change to String
    customAlias: {
        type: String,
        unique: true,
        sparse: true, // Allows null values (useful for unique constraints)
    },
});


export const shortUrl = mongoose.model<shortURL>('shortUrl', urlSchema);