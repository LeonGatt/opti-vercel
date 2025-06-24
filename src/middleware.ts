import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Skip all paths that should not be internationalized
    '/((?!_next|monitoring-tunnel|admin|_vercel|api|robots.txt|favicon.ico|sitemap|.*\\..*).*)',
  ],
}
