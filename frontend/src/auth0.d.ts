// src/auth0.d.ts
import { RedirectLoginOptions } from '@auth0/auth0-react';

declare module '@auth0/auth0-react' {
    interface RedirectLoginOptions {
        screen_hint?: 'signup';
    }
}
