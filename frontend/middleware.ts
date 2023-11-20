import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { tokenIsValid, getToken, getRole} from '@/utils/globalFunctions';
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token');
    if (request.nextUrl.pathname !== '/login' && (!token || !tokenIsValid(token.value))) {
        request.cookies.delete('access_token');
        
        return NextResponse.redirect(new URL('/login', request.url))
    }
    const tt = request.cookies.get('access_token');

    // if route is /login and user is logged in, redirect based on user role
    if (request.nextUrl.pathname === '/login' && token) {
        const role = getRole();
        if (role === 'ADMIN') {
            return NextResponse.redirect(new URL('/admin', request.url))
        }
        if (role === 'STUDENT') {
            return NextResponse.redirect(new URL('/elevi', request.url))
        }
        if (role === 'TEACHER') {
            return NextResponse.redirect(new URL('/profesori', request.url))
        }
    }
    // return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: ['/admin/:path*', '/admin', '/elevi/:path*', '/elevi', '/profesori/:path*', '/profesori', '/login'],
}
