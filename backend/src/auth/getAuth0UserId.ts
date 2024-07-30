import { Request } from 'express';
import jwt from 'jsonwebtoken';

// function to get Auth0 User id from the header
export function getAuth0UserId(req: Request): string | null {

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return null;

        const token = authHeader.split(' ')[1];
        if (!token) return null;
        const decoded = jwt.decode(token) as { sub: string } | null;
        return decoded ? decoded.sub : null;

    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}
