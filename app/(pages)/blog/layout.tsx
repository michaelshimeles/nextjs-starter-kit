import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { Analytics } from "@vercel/analytics/react";
import NavBar from "@/components/wrapper/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://rasmic.xyz"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Michael Shimeles",
    template: "%s | Michael Shimeles",
  },
  description: "Servant of Jesus, Full Stack Engineer, & YouTuber.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <NavBar />

      <div className="antialiased tracking-tight">
        <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8">
          <main className="max-w-[60ch] mt-[2rem] mx-auto w-full space-y-6">
            {children}
          </main>
          <Footer />
          <Analytics />
        </div>
      </div>
    </ViewTransitions>
  );
}

function Footer() {
  const links = [
    { name: "@rasmickyy", url: "https://x.com/rasmickyy" },
    { name: "youtube", url: "https://www.youtube.com/@rasmic" },
    { name: "linkedin", url: "https://www.linkedin.com/in/michaelshimeles" },
    { name: "github", url: "https://github.com/michaelshimeles" },
  ];

  return (
    <footer className="mt-12 text-center">
      <div className="flex justify-center space-x-4 tracking-tight">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
}
