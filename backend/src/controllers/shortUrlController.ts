import { Response, Request } from "express";
import { createShortUrlService, getShortUrlByShortId, getLinkHistoryByUserId } from "../services/shortUrlService";
import { Analytics } from "../models/analytic.model";
import { expressjwt, Request as JWTRequest } from "express-jwt";
import { shortUrl } from "../models/shortUrl.model";
import { getAuth0UserId } from "../auth/getAuth0UserId";

function isErrorWithMessage(error: unknown): error is { message: string } {
    return typeof error === 'object' && error !== null && 'message' in error;
}

export async function createShortUrl(req: Request, res: Response): Promise<Response> {
    try {
        const auth0Id = getAuth0UserId(req);
        console.log({ user3: auth0Id });

        if (!auth0Id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const { destination, customAlias } = req.body;
        const newUrl = await createShortUrlService(destination, auth0Id, customAlias);
        await newUrl.save();

        // Log the response to verify the format
        console.log('Server response:', newUrl);

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

        const auth0Id = getAuth0UserId(req); // Function to get Auth0 user ID, if available
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


// export async function getAnalytics(req: JWTRequest, res: Response) {
//     try {
//         const user = req.auth;
//         console.log('user', user)

//         if (!user) {
//             return res.status(401).json({ error: "Unauthorized" });
//         }

//         const userId = user.sub;
//         const data = await analytics.find({ user: userId }).lean(); // Filter analytics by user ID
//         return res.status(200).json(data);
//     } catch (error) {
//         console.error('Error fetching analytics:', error);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// }

// export async function getAnalytics(req: Request, res: Response) {
//     try {
//         const userId = getUserIdFromRequest(req);
//         console.log(userId)
//         if (!userId) {
//             return res.status(401).json({ error: "User not authenticated" });
//         }

//         //Fetch analytics data specific to the user
//         const data = await analytics.find({ userId }).lean();
//         console.log(data)

//         if (!data || data.length === 0) {
//             return res.status(200).json({ error: "No analytics data found for this user" });
//         }

//         return res.status(200).json(data);
//     } catch (error) {
//         console.error('Error fetching analytics:', error);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// }


export async function getLinkHistory(req: Request, res: Response) {
    const auth0Id = getAuth0UserId(req)
    console.log({ user: auth0Id })

    if (!auth0Id) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    try {

        const userLinks = await shortUrl.find({ auth0Id }).lean();
        if (!userLinks || userLinks.length === 0) {
            return res.status(200).json({ message: 'No URLs found for this user' });
        }
        return res.status(200).json(userLinks);
    } catch (error) {
        console.error('Error fetching link history:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}