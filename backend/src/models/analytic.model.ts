import mongoose, { Document } from "mongoose";
import { shortURL } from "./shortUrl.model";




export interface Analytics extends Document {
    shortId: shortURL;
}

const urlSchema = new mongoose.Schema({
    shortId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shortId",
        required: true,
    },
},
    { timestamps: true }

)



export const analytics = mongoose.model<Analytics>('analytics', urlSchema);