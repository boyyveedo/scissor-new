import { Response, Request } from "express";
import { createShortUrlService, getShortUrlByShortId, getLinkHistoryByUserId } from "../services/shortUrlService";
import { Analytics } from "../models/analytic.model";
import { expressjwt, Request as JWTRequest } from "express-jwt";
import { shortUrl } from "../models/shortUrl.model";
import { getAuth0UserId } from "../auth/getAuth0UserId";
import { clearLinkHistoryService } from "../services/shortUrlService";


function isErrorWithMessage(error: unknown): error is { message: string } {
    return typeof error === 'object' && error !== null && 'message' in error;
}

export async function createShortUrl(req: Request, res: Response): Promise<Response> {
    try {
        const auth0Id = getAuth0UserId(req);
        console.log(auth0Id)

        if (!auth0Id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const { destination, customAlias } = req.body;
        const newUrl = await createShortUrlService(destination, auth0Id, customAlias);
        await newUrl.save();


        // Return the newUrl object directly
        return res.status(201).json(newUrl);
    } catch (error) {
        console.error("Error creating short URL:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
export async function handleRedirect(req: Request, res: Response): Promise<void> {
    try {
        const { shortId } = req.params;

        // Find the short URL document using the shortId
        const short = await shortUrl.findOne({ shortId });

        if (!short) {
            console.error(`Short URL not found for ID: ${shortId}`);
            res.sendStatus(404);
            return;
        }

        // Increment the click count
        short.clicks += 1;
        await short.save();

        // Create an analytics entry
        const analyticsData = {
            shortUrl: short._id, // Use the _id of t he short URL document
            referrer: req.get('Referrer') || 'Direct', // Default to 'Direct' if no referrer
            userAgent: req.get('User-Agent'),
            ipAddress: req.ip,
            destination: short.destination, // Add destination
        };

        // Log the analytics data for debugging
        console.log('Analytics data:', analyticsData);

        // Save analytics data to the database
        await Analytics.create(analyticsData);

        // Redirect to the destination URL
        res.redirect(short.destination);
    } catch (error) {
        console.error('Error handling redirect:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export async function getAnalytics(req: Request, res: Response): Promise<Response> {
    try {
        const auth0Id = getAuth0UserId(req);

        if (!auth0Id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // Fetch short URLs created by the authenticated user
        const userShortUrls = await shortUrl.find({ auth0Id }).lean();

        if (!userShortUrls || userShortUrls.length === 0) {
            return res.status(404).json({ message: 'No short URLs found for this user' });
        }

        // Extract short URL IDs from the user's short URLs
        const shortUrlIds = userShortUrls.map(url => url._id.toString());

        // Fetch analytics data related to the user's short URLs
        const analyticsData = await Analytics.find({ shortUrl: { $in: shortUrlIds } }).lean();

        if (!analyticsData || analyticsData.length === 0) {
            return res.status(404).json({ message: 'No analytics data found for this user' });
        }

        // Aggregate analytics data for each short URL
        const aggregatedData = userShortUrls.map(shortUrl => {
            const shortUrlIdStr = shortUrl._id.toString();
            const relevantAnalytics = analyticsData.filter(data => data.shortUrl.toString() === shortUrlIdStr);
            const totalClicks = relevantAnalytics.length;
            const referrers = relevantAnalytics.map(entry => entry.referrer || 'Unknown');
            const uniqueReferrers = [...new Set(referrers)];

            return {
                shortUrlId: shortUrl._id,
                originalUrl: shortUrl.destination, // Include the original URL
                totalClicks,
                uniqueReferrers,
                data: relevantAnalytics,
            };
        });

        return res.status(200).json(aggregatedData);
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


export async function getLinkHistory(req: Request, res: Response) {
    const auth0Id = getAuth0UserId(req);
    console.log({ user: auth0Id });

    if (!auth0Id) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    try {
        const userLinks = await shortUrl.find({ auth0Id }).lean();
        if (!userLinks || userLinks.length === 0) {
            return res.status(200).json({ message: 'No URLs found for this user' });
        }
        // Log the retrieved documents to check their format
        console.log(userLinks);
        return res.status(200).json(userLinks);
    } catch (error) {
        console.error('Error fetching link history:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


// Controller to handle clearing link history
export async function handleClearHistory(req: Request, res: Response): Promise<Response> {
    const auth0Id = getAuth0UserId(req);
    console.log({ user: auth0Id });

    if (!auth0Id) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    try {
        await clearLinkHistoryService(auth0Id);
        return res.status(200).json({ message: 'History cleared successfully' });
    } catch (error) {
        console.error('Error clearing link history in controller:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}