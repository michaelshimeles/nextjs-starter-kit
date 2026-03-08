import 'server-only'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

type SessionData = typeof auth.$Infer.Session
type User = SessionData['user']
type SessionObj = SessionData['session']

interface AuthenticatedRequest extends NextRequest {
  user: User
  session: SessionObj
}

type RouteOptions =
  | { isPublic: true; isAuthenticated?: never }
  | { isAuthenticated: true; isPublic?: never }

type PublicHandler = (req: NextRequest, ctx: RouteContext) => Promise<NextResponse>
type AuthenticatedHandler = (req: AuthenticatedRequest, ctx: RouteContext) => Promise<NextResponse>

interface RouteContext {
  params?: Promise<Record<string, string>>
}

export function createRouteHandler(
  options: { isPublic: true },
  handler: PublicHandler,
): (req: NextRequest, ctx: RouteContext) => Promise<NextResponse>

export function createRouteHandler(
  options: { isAuthenticated: true },
  handler: AuthenticatedHandler,
): (req: NextRequest, ctx: RouteContext) => Promise<NextResponse>

export function createRouteHandler(
  options: RouteOptions,
  handler: PublicHandler | AuthenticatedHandler,
) {
  return async (req: NextRequest, ctx: RouteContext): Promise<NextResponse> => {
    try {
      if (options.isAuthenticated) {
        const session = await auth.api.getSession({ headers: await headers() })
        if (!session?.user || !session?.session) {
          return NextResponse.json(
            { data: null, error: 'Unauthorized' },
            { status: 401 },
          )
        }

        const authedReq = req as AuthenticatedRequest
        authedReq.user = session.user
        authedReq.session = session.session

        return await (handler as AuthenticatedHandler)(authedReq, ctx)
      }

      return await (handler as PublicHandler)(req, ctx)
    } catch (error) {
      console.error('Route handler error:', error)
      return NextResponse.json(
        { data: null, error: 'Internal server error' },
        { status: 500 },
      )
    }
  }
}
