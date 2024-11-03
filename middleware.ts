import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isDashboardRoute = createRouteMatcher(['/dashboard(.*)'])
const isAdminRoute = createRouteMatcher(['/dashboard/admin(.*)'])

type SessionMetadata = {
  role?: string;
};

export default clerkMiddleware((auth, req) => {
  if (isDashboardRoute(req)) {
    // Check if the user is authenticated
    if (!auth().userId) {
      // User is not authenticated, redirect to homepage
      const homepageUrl = new URL('/', req.url)
      return NextResponse.redirect(homepageUrl)
    }
  }
  if (isAdminRoute(req)) {
    // Check if the user is authenticated and an admin
    const { userId } = auth()
    if (!userId) {
      // User is not authenticated, redirect to homepage
      const homepageUrl = new URL('/', req.url)
      return NextResponse.redirect(homepageUrl)
    }
    // Check if the user is an admin
    const isAdmin = (auth().sessionClaims?.metadata as SessionMetadata)?.role === 'admin'
    if (!isAdmin) {
      // User is not an admin, redirect to homepage or unauthorized page
      const unauthorizedUrl = new URL('/', req.url)
      return NextResponse.redirect(unauthorizedUrl)
    }
  }
  // For all other routes, continue as normal
  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}