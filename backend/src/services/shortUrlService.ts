import { shortURL, shortUrl } from "../models/shortUrl.model";
import { nanoid } from "nanoid";


export async function createShortUrlService(destination: string, auth0Id: string, customAlias?: string): Promise<shortURL> {
    if (!destination) {
        throw new Error('Destination required');
    }

    if (customAlias && customAlias.trim() !== '') {
        // Check if the customAlias is already used
        const existingCustomAlias = await shortUrl.findOne({ customAlias });
        if (existingCustomAlias) {
            throw new Error('Custom URL already in use');
        }
    }

    // Generate a shortId if customAlias is not provided
    const shortId = customAlias || nanoid(6);

    // Create the new URL document
    const newUrlData: Partial<shortURL> = {
        shortId,
        destination,
        auth0Id,
        clicks: 0,
    };

    if (customAlias && customAlias.trim() !== '') {
        newUrlData.customAlias = customAlias.trim();
    }

    const newUrl = new shortUrl(newUrlData);

    // Save the new URL to the database
    await newUrl.save();

    return newUrl;
}
export async function getShortUrlByShortId(shortId: string) {
    const short = await shortUrl.findOne({ $or: [{ shortId }, { customAlias: shortId }] });
    if (!short) {
        throw new Error('URL not found');
    }
    short.clicks++;
    await short.save();
    return short;
}

export async function getLinkHistoryByUserId(userId: string) {
    const userLinks = await shortUrl.find({ user: userId }).lean();
    return userLinks;
}
