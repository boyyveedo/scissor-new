// express.d.ts
import { User } from './path-to-user-type'; // Adjust the import based on your actual user type

declare global {
    namespace Express {
        interface Request {
            user?: {
                sub: string;
                [key: string]: any; // You can add more properties based on your user object
            };
        }
    }
}

