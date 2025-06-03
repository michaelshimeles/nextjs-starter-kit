import { auth } from "@/lib/auth/auth";
import { db } from "@/db/drizzle";
import { subscription, member, OrganizationRole } from "@/db/schema";
import { eq, and, inArray } from "drizzle-orm";
import { headers } from "next/headers";

type SubscriptionResult = {
  hasActiveSubscription: boolean;
  error?: string;
  errorType?: "CANCELED" | "EXPIRED" | "GENERAL";
};

export async function activeSubscription(): Promise<SubscriptionResult> {
  try {
    // Get current user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.session?.userId) {
      return { hasActiveSubscription: false };
    }

    const userId = session.session.userId;

    // Get all user memberships in a single query
    const allMemberships = await db
      .select({
        organizationId: member.organizationId,
        role: member.role,
      })
      .from(member)
      .where(eq(member.userId, userId));

    if (allMemberships.length === 0) {
      return { hasActiveSubscription: false };
    }

    // Separate admin and member organization IDs to avoid overlapping checks
    const adminOrgIds = allMemberships
      .filter((m) => m.role === OrganizationRole.ADMIN)
      .map((m) => m.organizationId);

    const memberOrgIds = allMemberships
      .filter((m) => m.role !== OrganizationRole.ADMIN)
      .map((m) => m.organizationId);

    const allOrgIds = allMemberships.map((m) => m.organizationId);

    // Batch query all active subscriptions for user's organizations
    const activeSubscriptions = await db
      .select()
      .from(subscription)
      .where(
        and(
          inArray(subscription.organizationId, allOrgIds),
          eq(subscription.status, "active"),
        ),
      );

    const now = new Date();

    // Check admin organizations first (higher priority)
    for (const orgId of adminOrgIds) {
      const sub = activeSubscriptions.find((s) => s.organizationId === orgId);
      if (sub) {
        const currentPeriodEnd = new Date(sub.currentPeriodEnd);
        if (!sub.canceledAt && currentPeriodEnd > now) {
          return { hasActiveSubscription: true };
        } else {
          const errorType = sub.canceledAt ? "CANCELED" : "EXPIRED";
          const errorMessage = `Admin subscription is ${sub.canceledAt ? "canceled" : "expired"}`;
          throw new Error(`SUBSCRIPTION_INVALID:${errorType}:${errorMessage}`);
        }
      }
    }

    // Then check member organizations (excluding admin ones to avoid redundancy)
    for (const orgId of memberOrgIds) {
      const sub = activeSubscriptions.find((s) => s.organizationId === orgId);
      if (sub) {
        const currentPeriodEnd = new Date(sub.currentPeriodEnd);
        if (!sub.canceledAt && currentPeriodEnd > now) {
          return { hasActiveSubscription: true };
        } else {
          const errorType = sub.canceledAt ? "CANCELED" : "EXPIRED";
          const errorMessage = `Member subscription is ${sub.canceledAt ? "canceled" : "expired"}`;
          throw new Error(`SUBSCRIPTION_INVALID:${errorType}:${errorMessage}`);
        }
      }
    }

    return { hasActiveSubscription: false };
  } catch (error) {
    console.error("💥 Error checking active subscription:", error);

    // Handle our custom subscription errors
    if (
      error instanceof Error &&
      error.message.startsWith("SUBSCRIPTION_INVALID:")
    ) {
      const [, errorType, errorMessage] = error.message.split(":");
      return {
        hasActiveSubscription: false,
        error: errorMessage,
        errorType: errorType as "CANCELED" | "EXPIRED",
      };
    }

    // Handle general errors
    return {
      hasActiveSubscription: false,
      error: "Failed to check subscription status",
      errorType: "GENERAL",
    };
  }
}
