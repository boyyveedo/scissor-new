import { Request } from 'express';

interface User {
    sub: string;
}

export interface CustomRequest extends Request {
    user?: User;
}
