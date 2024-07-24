// custom.d.ts
import { User } from 'oidc-client';

declare module 'express-serve-static-core' {
    interface Request {
        oidc?: {
            user?: {
                sub: string;
                // other user properties if needed
            }
        }
    }
}
