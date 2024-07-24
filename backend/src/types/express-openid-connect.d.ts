declare module 'express-openid-connect' {
    import { RequestHandler } from 'express';

    interface ConfigParams {
        authRequired: boolean;
        auth0Logout: boolean;
        secret: string;
        baseURL: string;
        clientID: string;
        issuerBaseURL: string;
    }

    export function auth(config: ConfigParams): RequestHandler;
}