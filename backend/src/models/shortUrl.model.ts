import mongoose, { Document } from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcde098765", 4);

export interface shortURL extends Document {
    shortId: string;
    destination: string;
    customAlias?: string;
    clicks: number;
    auth0Id: string; // Store Auth0 user ID
}

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        unique: true,
        required: true,
        default: () => nanoid(4),
    },
    destination: { type: String, required: true },
    clicks: { type: Number, required: true, default: 0 },
    auth0Id: { type: String, required: true },
    customAlias: {
        type: String,
        unique: true,
        sparse: true, // Allows null values (useful for unique constraints)
        default: undefined, // Set default to undefined to avoid null values
    },
    createdAt: { type: Date, default: Date.now },

});

export const shortUrl = mongoose.model<shortURL>('shortUrl', urlSchema);
