import Provider from '@/app/provider'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import AuthWrapper from '@/components/wrapper/auth-wrapper'
import { Analytics } from "@vercel/analytics/react"
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import Head from 'next/head'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL("https://starter.rasmic.xyz"),
  title: {
    default: 'Nextjs Starter Kit',
    template: `%s | Nextjs Starter Kit`
  },
  openGraph: {
    description: 'Everything you need to quickly build your SaaS giving you time to focus on what really matters',
    images: ['https://utfs.io/f/8a428f85-ae83-4ca7-9237-6f8b65411293-eun6ii.png']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nextjs Starter ',
    description: 'Everything you need to quickly build your SaaS giving you time to focus on what really matters.',
    siteId: "",
    creator: "@rasmic",
    creatorId: "",
    images: ['https://utfs.io/f/8a428f85-ae83-4ca7-9237-6f8b65411293-eun6ii.png'],
  },
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthWrapper>
      <html lang="en" suppressHydrationWarning>
        <Head>
          <meta property="description" content="Everything you need to quickly build your SaaS giving you time to focus on what really matters" />
          <meta property="og:image" content="https://utfs.io/f/8a428f85-ae83-4ca7-9237-6f8b65411293-eun6ii.png"></meta>
          <meta property="og:url" content="https://starter.rasmic.xyz/"></meta>
          <meta property="twitter:image" content="https://utfs.io/f/8a428f85-ae83-4ca7-9237-6f8b65411293-eun6ii.png"></meta>
        </Head>
        <body className={GeistSans.className}>
          <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </Provider>
          <Analytics />
        </body>
      </html>
    </AuthWrapper>
  )
}