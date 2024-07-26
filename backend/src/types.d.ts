// src/types.d.ts

import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            auth?: {
                sub: string; // Adjust based on your JWT payload structure
            };
        }
    }
}
