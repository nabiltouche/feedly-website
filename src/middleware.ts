import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match only internationalized pathnames
    // The previous matcher skipped routes like `/legal` when the locale prefix was omitted (as-needed).
    matcher: ['/', '/(fr|en|ar)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
