
import { Router } from 'express';
import { createShortUrl, getAnalytics, getLinkHistory, handleRedirect } from "../controllers/shortUrlController";
import { getQRCode } from "../controllers/qrCodeController";
import validateLink from '../middleware/validateLink';
import shortUrlSchema from '../shema/shortUrl';
import { cacheMiddleware } from '../middleware/cacheMiddleware';
import { handleClearHistory } from '../controllers/shortUrlController';

const routes = Router();

routes.post('/shorten', validateLink(shortUrlSchema), createShortUrl);
routes.get('/analytics', cacheMiddleware, getAnalytics);
routes.get('/history', cacheMiddleware, getLinkHistory);
routes.get('/generate', getQRCode);
routes.get('/:shortId', cacheMiddleware, handleRedirect);
routes.delete('/history', handleClearHistory);




export default routes;
