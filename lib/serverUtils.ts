import 'server-only'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { getBaseUrl } from '@/lib/utils'

async function getAuthHeaders(): Promise<HeadersInit> {
  const reqHeaders = await headers()
  const cookie = reqHeaders.get('cookie')
  return cookie ? { cookie } : {}
}

export async function secureFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const authHeaders = await getAuthHeaders()
  const isFormData = init?.body instanceof FormData

  const response = await fetch(`${getBaseUrl()}${path}`, {
    ...init,
    headers: {
      ...authHeaders,
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(init?.headers ?? {}),
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }))
    throw new Error(error?.error ?? response.statusText)
  }

  return response.json() as Promise<T>
}

export async function publicFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const isFormData = init?.body instanceof FormData

  const response = await fetch(`${getBaseUrl()}${path}`, {
    ...init,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(init?.headers ?? {}),
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }))
    throw new Error(error?.error ?? response.statusText)
  }

  return response.json() as Promise<T>
}
