import express, { Request, Response, NextFunction } from 'express';
import { Port } from './config/config';
import bodyParser from 'body-parser';
import routes from './routes';
import { connectDB } from './database/mongoDb';
import authMiddleware from './auth/auth0';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { corsOrigin } from './config/config';
import { expressjwt, GetVerificationKey, Request as JWTRequest } from 'express-jwt';
import JwksRsa from 'jwks-rsa';
import axios from 'axios';

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Optionally, exit the process or perform other recovery actions
    // process.exit(1);
});

const app = express();
app.use(cors({
    origin: corsOrigin
}));

export const verifyJwt = expressjwt({
    secret: JwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-7qo6wjkq8kn38us4.us.auth0.com/.well-known/jwks.json'
    }) as GetVerificationKey,
    audience: 'https://www.scissor-api.com',
    issuer: 'https://dev-7qo6wjkq8kn38us4.us.auth0.com/',
    algorithms: ['RS256']
}).unless({
    path: [
        { url: '/shorten', methods: ['POST'] }, // Exclude the /shorten endpoint
        { url: '/:shortId', methods: ['GET'] },// Example for a public GET route
        { url: '/', methods: ['GET'] },
    ]
});

app.use(verifyJwt);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);
// //app.get('*', (req: JWTRequest, res) => {
//     console.log("auth object", req.auth)
// })

app.get('/', (req, res) => {
    res.send("WELCOME HOME");
});

app.use('/', routes);

// Error handling middleware for rate limiting
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error && err.name === 'RateLimitError') {
        res.status(429).send('Too many requests from this IP, please try again later.');
    } else {
        next(err);
    }
});

app.listen(Port, () => {
    console.log(`Application started at http://localhost:${Port}`);
    connectDB();
});
