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
        const short = await getShortUrlByShortId(shortId);

        if (!short) {
            res.status(404).json({ error: 'Short URL not found' });
            return;
        }

        const clickData: any = {
            shortId: short._id,
            referrer: req.get('Referrer'),
            userAgent: req.get('User-Agent'),
            ipAddress: req.ip,
        };

        const auth0Id = getAuth0UserId(req);
        if (auth0Id) {
            clickData.auth0Id = auth0Id;
        }

        await Analytics.create(clickData);
        res.redirect(short.destination);

    } catch (error) {
        console.error('Error handling redirect:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export async function getAnalytics(req: Request, res: Response) {
    try {

        const auth0Id = getAuth0UserId(req);
        console.log({ user1: auth0Id })


        if (!auth0Id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // Fetch all URLs created by the user
        const userUrls = await shortUrl.find({ auth0Id }).lean();

        // Extract shortId from the URLs
        const shortIds = userUrls.map(url => url._id);

        // Fetch analytics data for these shortIds
        const analyticsData = await Analytics.find({ shortId: { $in: shortIds } }).lean();

        return res.status(200).json({ analyticsData });
    } catch (error) {
        console.error('Error fetching user analytics:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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