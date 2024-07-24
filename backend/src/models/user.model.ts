import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    auth0Id: string;
    name: string;
    email: string;
}

const userSchema = new Schema<IUser>({
    auth0Id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true }
});

export const User = mongoose.model<IUser>('User', userSchema);
