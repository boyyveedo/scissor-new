import { Request } from 'express';
import jwt from 'jsonwebtoken';

export function getAuth0UserId(req: Request): string | null {
    console.log(req.headers)
    const authHeader = req.headers.authorization;
    // console.log(authHeader)
    if (!authHeader) return null;

    const token = authHeader.split(' ')[1];
    console.log(token)
    if (!token) return null;

    try {
        const decoded = jwt.decode(token) as { sub: string } | null;
        console.log({ details: decoded })
        return decoded ? decoded.sub : null;

    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}
