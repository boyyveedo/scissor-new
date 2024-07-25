// import mongoose, { Document } from 'mongoose';
// import { customAlphabet } from 'nanoid';

// const nanoid = customAlphabet('abcde098765', 6);

// export interface shortURL extends Document {
//     shortId: string;
//     destination: string;
//     customAlias?: string;
//     clicks: number;
//     user: mongoose.Schema.Types.ObjectId; // Reference to User model
//     auth0Id: string; // Add this field to store Auth0 user ID

// }

// const urlSchema = new mongoose.Schema({
//     shortId: {
//         type: String,
//         unique: true,
//         required: true,
//         default: () => nanoid(),
//     },
//     destination: { type: String, required: true },
//     clicks: { type: Number, required: true, default: 0 },
//     customAlias: {
//         type: String,
//         unique: true,
//         sparse: true,
//     },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming there's a User model
//     auth0Id: { type: String, required: false }, // Add this field

// });

// export const shortUrl = mongoose.model<shortURL>('shortUrl', urlSchema);


import mongoose, { Document } from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcde098765", 6)




export interface shortURL extends Document {
    shortId: string
    destination: string
    customAlias?: string;
    clicks: number;
    auth0Id: string; // Store Auth0 user ID

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
    auth0Id: { type: String, required: true }, // Link to Auth0 user
    customAlias: {
        type: String,
        unique: true,
        sparse: true, // Allows null values (useful for unique constraints)
    },
});


export const shortUrl = mongoose.model<shortURL>('shortUrl', urlSchema);