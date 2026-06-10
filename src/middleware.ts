import { NextRequest, NextResponse } from 'next/server'

/**
 * Locale routing ("as-needed" prefix):
 *   /…            → Spanish (default), rewritten internally to /es/… (URL stays clean)
 *   /en/… , /ca/… → English / Catalan, served directly
 *   /es/…         → redirected to the clean (prefix-less) URL
 *
 * The (payload) admin + API routes and static assets are excluded via `matcher`.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const seg = pathname.split('/')[1]

  // Canonicalise: the default locale never carries its prefix.
  if (seg === 'es') {
    const url = req.nextUrl.clone()
    url.pathname = pathname.replace(/^\/es(?=\/|$)/, '') || '/'
    return NextResponse.redirect(url, 308)
  }

  // English / Catalan are served as-is.
  if (seg === 'en' || seg === 'ca') {
    return NextResponse.next()
  }

  // Everything else is Spanish: rewrite to the /es route, keep the URL clean.
  const url = req.nextUrl.clone()
  url.pathname = `/es${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Skip API, admin, Next internals and any file with an extension.
  matcher: ['/((?!api|admin|_next|_payload|.*\\..*).*)'],
}
