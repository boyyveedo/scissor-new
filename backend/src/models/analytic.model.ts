import mongoose, { Document, Schema } from 'mongoose';

export interface Analytics extends Document {
    shortUrl: mongoose.Schema.Types.ObjectId;
    referrer?: string;
    userAgent?: string;
    ipAddress?: string;
    createdAt?: Date;
    destination?: string; // Add this line
}

const analyticsSchema = new Schema<Analytics>({
    shortUrl: {
        type: Schema.Types.ObjectId,
        ref: 'shortUrl',
        required: true,
    },
    referrer: { type: String, default: 'Unknown' },
    userAgent: { type: String, default: 'Unknown' },
    ipAddress: { type: String, default: 'Unknown' },
    destination: { type: String, required: true }, // Add this line
}, { timestamps: true });

export const Analytics = mongoose.model<Analytics>('Analytics', analyticsSchema);
