// types.d.ts
import 'express-jwt';

declare module 'express-jwt' {
    export interface Request {
        auth?: {
            sub: string;
        };
    }
}
