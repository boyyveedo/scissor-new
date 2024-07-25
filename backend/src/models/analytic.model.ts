import mongoose, { Document, Schema } from 'mongoose';
import { shortUrl } from './shortUrl.model';

export interface Analytics extends Document {
    shortId: mongoose.Schema.Types.ObjectId; // Reference to shortUrl model
    auth0Id: string; // Auth0 user ID
    referrer?: string; // Optional: Where the traffic came from
    userAgent?: string; // Optional: Information about the user's browser
    ipAddress?: string; // Optional: IP address of the user
    timestamp: Date; // Timestamp for when the click occurred
}

const analyticsSchema = new Schema<Analytics>({
    shortId: {
        type: Schema.Types.ObjectId,
        ref: 'shortUrl', // Reference to the shortUrl model
        required: true,
    },
    auth0Id: {
        type: String,
        required: true,
    },
    referrer: {
        type: String,
        default: 'Direct',
    },
    userAgent: {
        type: String,
    },
    ipAddress: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

export const Analytics = mongoose.model<Analytics>('Analytics', analyticsSchema);
