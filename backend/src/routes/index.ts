// index.ts

import { Router } from 'express';
import { createShortUrl, getAnalytics, getLinkHistory, handleRedirect } from "../controllers/shortUrlController";
import { getQRCode } from "../controllers/qrCodeController";
import validateLink from '../middleware/validateLink';
import shortUrlSchema from '../shema/shortUrl';


const routes = Router();

routes.post('/shorten', validateLink(shortUrlSchema), createShortUrl);
routes.get('/analytics', getAnalytics);
routes.get('/history', getLinkHistory);
routes.get('/generate', getQRCode);
routes.get('/:shortId', handleRedirect);


export default routes;
