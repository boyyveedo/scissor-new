import { Router } from 'express';
import { createShortUrl, handleRedirect } from "../controllers/shortUrlController"
import { getQRCode } from "../controllers/qrCodeController"
import { getAnalytics } from '../controllers/shortUrlController';
import { getLinkHistory } from '../controllers/shortUrlController';
import validateLink from '../middleware/validateLink';
import shortUrlSchema from '../shema/shortUrl';
import guard from '../middleware/permissions';

const routes = Router();




routes.post('/shorten', validateLink(shortUrlSchema), createShortUrl);
routes.get('/analytics', getAnalytics);
routes.get('/history', guard.check('read:scissor'), getLinkHistory);
routes.get('/generate', getQRCode);
routes.get('/:shortId', handleRedirect);




export default routes;

