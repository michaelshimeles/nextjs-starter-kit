"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="max-w-md w-full text-center shadow-2xl border-0  backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4 relative">
            <div className="absolute inset-0 animate-ping">
              <CheckCircle className="h-16 w-16 text-blue-400 mx-auto opacity-75" />
            </div>
            <CheckCircle className="h-16 w-16 text-blue-400 mx-auto relative" />
          </div>
          <CardTitle className="text-2xl font-bold mb-2">
            Payment Successful!
          </CardTitle>
          <CardDescription className="text-base">
            Thank you for your subscription. Your account has been activated and
            you&apos;re ready to start creating.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span>Welcome to the team!</span>
            <Sparkles className="h-4 w-4 text-yellow-500" />
          </div>

          <Button
            onClick={() => router.push("/dashboard")}
            className="w-full text-white font-medium py-3"
            size="lg"
          >
            Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <p className="text-xs text-muted-foreground">
            You&apos;ll receive a confirmation email shortly with your receipt
            and next steps.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
