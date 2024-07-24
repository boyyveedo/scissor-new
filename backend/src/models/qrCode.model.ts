// src/models/QRCode.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface QRCodeDocument extends Document {
    originalUrl: string;
    qrCodeBase64: string;
    createdAt: Date;
}

const QRCodeSchema: Schema = new Schema({
    originalUrl: { type: String, required: true },
    qrCodeBase64: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const QRCode = mongoose.model<QRCodeDocument>('QRCode', QRCodeSchema);

export default QRCode;
