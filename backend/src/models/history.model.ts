// src/models/linkHistory.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ILinkHistory extends Document {
    originalUrl: string;
    shortUrl: string;
    createdAt: Date;
    userId: string; // This should match the field used to store user identifiers
}

const LinkHistorySchema: Schema = new Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    userId: { type: String, required: true } // Ensure this matches your auth ID field
});

const LinkHistory = mongoose.model<ILinkHistory>('LinkHistory', LinkHistorySchema);

export default LinkHistory;
