import Provider from '@/app/provider'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import AuthWrapper from '@/components/wrapper/auth-wrapper'
import { Analytics } from "@vercel/analytics/react"
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL("https://starter.rasmic.xyz"),
  title: {
    default: 'Nextjs Starter Kit',
    template: `%s | Nextjs Starter Kit`
  },
  description: 'The Ultimate Nextjs 14 Starter Kit for quickly building your SaaS, giving you time to focus on what really matters',
  openGraph: {
    description: 'The Ultimate Nextjs 14 Starter Kit for quickly building your SaaS, giving you time to focus on what really matters',
    images: ['https://utfs.io/f/8a428f85-ae83-4ca7-9237-6f8b65411293-eun6ii.png'],
    url: 'https://starter.rasmic.xyz/'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nextjs Starter Kit',
    description: 'The Ultimate Nextjs 14 Starter Kit for quickly building your SaaS, giving you time to focus on what really matters',
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
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthWrapper>
            <Provider>
              {children}
              <Toaster />
            </Provider>
          </AuthWrapper>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}