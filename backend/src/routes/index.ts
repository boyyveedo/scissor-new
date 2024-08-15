import { Router } from 'express';
import { createShortUrl, getAnalytics, getLinkHistory, handleRedirect, handleClearHistory } from "../controllers/shortUrlController";
import { getQRCode } from "../controllers/qrCodeController";
import validateLink from '../middleware/validateLink';
import shortUrlSchema from '../shema/shortUrl';
import { cacheMiddleware } from '../middleware/cacheMiddleware';

const routes = Router();

/**
 * @openapi
 * /shorten:
 *   post:
 *     summary: Create a shortened URL
 *     operationId: createShortUrl
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: URL to be shortened
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               destination:
 *                 type: string
 *               customAlias:
 *                 type: string
 *             required:
 *               - destination
 *     responses:
 *       '201':
 *         description: Successfully created short URL
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShortUrl'
 *       '400':
 *         description: Invalid request
 *       '401':
 *         description: User not authenticated
 *       '500':
 *         description: Internal Server Error
 */
routes.post('/shorten', validateLink(shortUrlSchema), createShortUrl);

/**
 * @openapi
 * /analytics:
 *   get:
 *     summary: Get analytics for URLs created by the user
 *     operationId: getAnalytics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Analytics data retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 analyticsData:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Analytics'
 *       '401':
 *         description: User not authenticated
 *       '500':
 *         description: Internal Server Error
 */
routes.get('/analytics', cacheMiddleware, getAnalytics);

/**
 * @openapi
 * /history:
 *   get:
 *     summary: Get link history for the authenticated user
 *     operationId: getLinkHistory
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Link history retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShortUrl'
 *       '401':
 *         description: User not authenticated
 *       '500':
 *         description: Internal Server Error
 */
routes.get('/history/', cacheMiddleware, getLinkHistory);

/**
 * @openapi
 * /generate:
 *   get:
 *     summary: Generate a QR code
 *     operationId: getQRCode
 *     parameters:
 *       - name: data
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: QR code image
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       '400':
 *         description: Invalid data
 *       '500':
 *         description: Error generating QR code
 */
routes.get('/generate', getQRCode);

/**
 * @openapi
 * /{shortId}:
 *   get:
 *     summary: Redirect to the original URL
 *     operationId: handleRedirect
 *     parameters:
 *       - name: shortId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '302':
 *         description: Redirects to the original URL
 *       '404':
 *         description: Short URL not found
 *       '500':
 *         description: Internal Server Error
 */
routes.get('/:shortId', cacheMiddleware, handleRedirect);

/**
 * @openapi
 * /history:
 *   delete:
 *     summary: Clear link history for the authenticated user
 *     operationId: handleClearHistory
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: History cleared successfully
 *       '401':
 *         description: User not authenticated
 *       '500':
 *         description: Internal Server Error
 */
routes.delete('/history', handleClearHistory);

export default routes;
