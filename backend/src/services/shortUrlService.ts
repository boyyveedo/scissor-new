import { shortUrl } from "../models/shortUrl.model";
import { nanoid } from "nanoid";

export async function createShortUrlService(destination: string, userId: string, customAlias?: string) {
    if (customAlias) {
        const existingUrl = await shortUrl.findOne({ shortId: customAlias });
        if (existingUrl) {
            throw new Error('Custom URL already in use');
        }
    }

    const shortId = customAlias || nanoid(6);
    const newUrlData = { shortId, destination, user: userId };
    const newUrl = new shortUrl(newUrlData);
    await newUrl.save();

    return newUrl;
}

export async function getShortUrlByShortId(shortId: string) {
    const short = await shortUrl.findOne({ shortId });
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
