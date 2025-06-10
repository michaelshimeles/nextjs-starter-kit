"use client";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function ManageSubscription() {
  return (
    <Button
      variant="outline"
      onClick={async () => {
        try {
          await authClient.customer.portal();
        } catch (error) {
          console.error("Failed to open customer portal:", error);
        }
      }}
    >
      <ExternalLink className="h-4 w-4 mr-2" />
      Manage Subscription
    </Button>
  );
}
