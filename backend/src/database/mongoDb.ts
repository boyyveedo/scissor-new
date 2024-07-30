import { MongoURI } from "../config/config";
import mongoose from "mongoose";



export async function connectDB(): Promise<void> {
    try {
        if (!MongoURI) {
            throw new Error('MongoURI is not defined');
        }

        await mongoose.connect(MongoURI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}
export async function disconnectDB(): Promise<void> {
    try {
        await mongoose.disconnect();
        console.log('MongoDB disconnected successfully');
    } catch (error) {
        console.error('MongoDB disconnection error:', error);
    }
}