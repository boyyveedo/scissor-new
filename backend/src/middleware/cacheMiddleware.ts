
import { Request, Response, NextFunction } from 'express';
import redisClient from '../utils/redisClient';

export async function cacheMiddleware(req: Request, res: Response, next: NextFunction) {
    const shortId = req.params.shortId || req.body.customAlias;
    if (!shortId) return next();

    try {
        const cacheResult = await redisClient.get(shortId);
        if (cacheResult) {
            return res.status(200).json(JSON.parse(cacheResult));
        }
        next();
    } catch (error) {
        console.error('Cache Middleware Error:', error);
        next();
    }
}
