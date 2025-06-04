import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { ThemeProvider } from "../components/provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nextjs Starter Kit",
  description: "Generate and manage Nextjs Starter Kit",
  openGraph: {
    title: "Nextjs Starter Kit",
    description: "Generate and manage Nextjs Starter Kit",
    url: "https://apple-pass.vercel.app",
    siteName: "Nextjs Starter Kit",
    images: [
      {
        url: "https://jdj14ctwppwprnqu.public.blob.vercel-storage.com/lockscreen_opengraph-XZlGCb1IL4X735kYqgdRIo2XDjSIBk",
        width: 1200,
        height: 630,
        alt: "Lockscreen AI",
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-[-apple-system,BlinkMacSystemFont]antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          forcedTheme="light"
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
