import type { NextConfig } from "next";

const getR2Hostname = (): string | null => {
  const r2PublicUrl = process.env.R2_PUBLIC_URL;
  if (!r2PublicUrl) {
    return null;
  }
  try {
    // Add protocol if missing to ensure URL constructor works
    const urlWithProtocol = r2PublicUrl.startsWith("http")
      ? r2PublicUrl
      : `https://${r2PublicUrl}`;
    return new URL(urlWithProtocol).hostname;
  } catch {
    console.warn(`Invalid R2_PUBLIC_URL: ${r2PublicUrl}`);
    return null;
  }
};

const r2Hostname = getR2Hostname();

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      // Conditionally include R2 pattern only if R2_PUBLIC_URL is configured
      ...(r2Hostname
        ? [
            {
              protocol: "https" as const,
              hostname: r2Hostname,
            },
          ]
        : []),
      {
        protocol: "https",
        hostname: "jdj14ctwppwprnqu.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
