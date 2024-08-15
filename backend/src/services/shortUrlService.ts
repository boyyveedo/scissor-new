import { shortURL, shortUrl } from "../models/shortUrl.model";
import LinkHistory from "../models/history.model";
import { Analytics } from "../models/analytic.model";
import { nanoid } from "nanoid";


export async function createShortUrlService(destination: string, auth0Id: string, customAlias?: string): Promise<shortURL> {
    if (!destination) {
        throw new Error('Destination required');
    }

    // Check if customAlias is provided and if it is already in use
    if (customAlias && customAlias.trim() !== '') {
        const existingCustomAlias = await shortUrl.findOne({ customAlias });
        if (existingCustomAlias) {
            throw new Error('Custom URL already in use');
        }
    }

    const shortId = customAlias || nanoid(4);
    const newUrl = new shortUrl({
        shortId,
        destination,
        auth0Id,
        clicks: 0,
        customAlias: customAlias?.trim() || undefined,
        createdAt: new Date(), // Explicitly set createdAt
    });

    // Save the new URL to the database
    await newUrl.save();

    return newUrl;
}
export async function getShortUrlByShortId(shortId: string) {
    console.log('Fetching Short URL by ID:', shortId);
    const short = await shortUrl.findOne({ $or: [{ shortId }, { customAlias: shortId }] });
    if (!short) {
        console.error('URL not found');
        throw new Error('URL not found');
    }
    short.clicks++;
    await short.save();
    console.log('Short URL Clicks Updated:', short.clicks);
    return short;
}



export async function getLinkHistoryByUserId(userId: string) {
    try {
        const userLinks = await LinkHistory.find({ userId }).lean();
        return userLinks;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Error fetching link history: ' + error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

// Service to clear link history for a user
export const clearLinkHistoryService = async (auth0Id: string): Promise<void> => {
    try {
        // Remove all URLs associated with the authenticated user
        await shortUrl.deleteMany({ auth0Id });

        // Optionally, clear analytics data related to these URLs
        const userLinks = await shortUrl.find({ auth0Id }).lean();
        const shortIds = userLinks.map(url => url._id);
        await Analytics.deleteMany({ shortId: { $in: shortIds } });
    } catch (error) {
        console.error('Error clearing link history in service:', error);
        throw new Error('Failed to clear link history');
    }
};