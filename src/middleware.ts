import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip auth check for login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Get the auth cookie
    const authCookie = request.cookies.get('admin-auth')
    
    // If no auth cookie, redirect to login
    if (!authCookie) {
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('from', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next()
}

// Specify which paths the middleware should run on
export const config = {
  matcher: [
    '/admin/:path*',
  ],
} 