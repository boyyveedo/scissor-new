import express, { Request, Response, NextFunction } from 'express';
import { Port } from './config/config';
import bodyParser from 'body-parser';
import routes from './routes';
import { connectDB } from './database/mongoDb';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
//import { corsOrigin } from './config/config';
import { expressjwt, GetVerificationKey } from 'express-jwt';
import JwksRsa from 'jwks-rsa';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerDocument from './swaggerDefinition';

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Optionally, exit the process or perform other recovery actions
    process.exit(1);
});

const app = express();

const corsOptions = {
    origin: [
        'https://scissors-beta.vercel.app',
        'http://localhost:3001',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204
};

// Apply the CORS middleware
app.use(cors(corsOptions));
// Swagger setup
const swaggerOptions = {
    swaggerDefinition: swaggerDocument,
    apis: ['./routes/*.ts'], // Path to the API docs
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware to add default authorization header to Swagger UI
app.use('/api-docs', swaggerUi.serve, (req: Request, res: Response, next: NextFunction) => {
    swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
            authAction: {
                BearerAuth: {
                    name: "BearerAuth",
                    schema: {
                        type: "http",
                        in: "header",
                        name: "Authorization",
                        description: "",
                    },
                    value: "Bearer YOUR_DEFAULT_JWT_TOKEN_HERE" // Replace with your actual token for development
                }
            }
        }
    })(req, res, next);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Debugging middleware to log headers and request path
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Request Path:', req.path);
    console.log('Request Method:', req.method);
    console.log('Request Headers:', req.headers);
    next();
});

// JWT middleware configuration
const jwtMiddleware = expressjwt({
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
        { url: '/shorten', methods: ['POST'] },
        { url: '/', methods: ['GET'] },
        { url: '/:shortId', methods: ['GET'] },
        { url: /^\/[a-zA-Z0-9_-]+$/, methods: ['GET'] },
        { url: '/api-docs', methods: ['GET'] },
    ]
});

app.use(jwtMiddleware);

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Routes
app.get('/', (req: Request, res: Response) => {
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

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Global Error Handler:', err);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

export default app;

// Server startup
if (require.main === module) {
    app.listen(Port, () => {
        console.log(`Application started at http://localhost:${Port}`);
        connectDB().catch((err) => {
            console.error('Failed to connect to MongoDB:', err);
            process.exit(1);
        });
    });
}
