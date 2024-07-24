import express, { Request, Response, NextFunction } from 'express'
import { Port } from './config/config'
import bodyParser from 'body-parser'
import routes from './routes'
import { connectDB } from './database/mongoDb'
import authMiddleware from './auth/auth0'
import rateLimit from 'express-rate-limit';
import cors from 'cors'
import { corsOrigin } from './config/config'
import { auth } from 'express-oauth2-jwt-bearer'
import axios from 'axios'
import JwksRsa from 'jwks-rsa'
import { expressjwt, GetVerificationKey } from 'express-jwt';





const app = express()
app.use(cors({
    origin: corsOrigin
}));

const verifyJwt = expressjwt({
    secret: JwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'dev-7qo6wjkq8kn38us4.us.auth0.com/.well-known/jwks.json'
    }) as GetVerificationKey,
    audience: 'https://www.scissor-api.com',
    issuer: 'https://dev-7qo6wjkq8kn38us4.us.auth0.com/',
    algorithms: ['RS256']
}).unless({ path: ['/'] });

app.use(verifyJwt)







app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(authMiddleware)
// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

app.get('/', (req, res) => {
    res.send("WELCOME HOME")
})

//app.use('/api/v1/url', routes)
app.use('/', routes)


// Error handling middleware for rate limiting
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error && err.name === 'RateLimitError') {
        res.status(429).send('Too many requests from this IP, please try again later.');
    } else {
        next(err);
    }
});

app.listen(Port, () => {
    console.log(`Application started at http://localhost:${Port}`)
    connectDB()

})