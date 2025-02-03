"use client";
import { useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";

export default function Provider({ children }: { children: ReactNode }) {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
    </ConvexProviderWithClerk>
  );
}

