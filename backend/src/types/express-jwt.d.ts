// src/types/express-jwt.d.ts

import { RequestHandler } from 'express';

interface Options {
    secret: string | Buffer | GetVerificationKey;
    algorithms: string[];
    credentialsRequired?: boolean;
    isRevoked?: IsRevoked;
    requestProperty?: string;
    getToken?: GetToken;
}

type GetVerificationKey = (req: Request, payload: any, done: (err: any, key?: string | Buffer) => void) => void;
type IsRevoked = (req: Request, payload: any, done: (err: any, revoked?: boolean) => void) => void;
type GetToken = (req: Request) => string | null;

function jwt(options: Options): RequestHandler;

namespace jwt {
    const UnauthorizedError: any;
}

export = jwt;
