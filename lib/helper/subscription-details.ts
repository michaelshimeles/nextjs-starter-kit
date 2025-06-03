import { auth } from "@/lib/auth/auth";
import { db } from "@/db/drizzle";
import { subscription, member, OrganizationRole } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { headers } from "next/headers";

type SubscriptionDetails = {
  id: string;
  productId: string;
  status: string;
  amount: number;
  currency: string;
  recurringInterval: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  canceledAt: Date | null;
  organizationId: string | null;
};

type SubscriptionDetailsResult = {
  hasSubscription: boolean;
  subscription?: SubscriptionDetails;
  error?: string;
  errorType?: "CANCELED" | "EXPIRED" | "GENERAL";
};

export async function getSubscriptionDetails(): Promise<SubscriptionDetailsResult> {
  try {
    // Get current user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.session?.userId) {
      return { hasSubscription: false };
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
      return { hasSubscription: false };
    }

    const allOrgIds = allMemberships.map((m) => m.organizationId);

    // Get all subscriptions for user's organizations
    const subscriptions = await db
      .select()
      .from(subscription)
      .where(inArray(subscription.organizationId, allOrgIds));

    if (subscriptions.length === 0) {
      return { hasSubscription: false };
    }

    const now = new Date();

    // Find the most relevant subscription (active first, then most recent)
    const activeSubscriptions = subscriptions.filter(sub => sub.status === "active");
    
    let targetSubscription = null;

    if (activeSubscriptions.length > 0) {
      // Prefer admin subscriptions, then active ones
      const adminOrgIds = allMemberships
        .filter((m) => m.role === OrganizationRole.ADMIN)
        .map((m) => m.organizationId);

      targetSubscription = activeSubscriptions.find(sub => 
        adminOrgIds.includes(sub.organizationId!)
      ) || activeSubscriptions[0];
    } else {
      // If no active subscriptions, get the most recent one
      targetSubscription = subscriptions.sort((a, b) => 
        new Date(b.currentPeriodEnd).getTime() - new Date(a.currentPeriodEnd).getTime()
      )[0];
    }

    if (!targetSubscription) {
      return { hasSubscription: false };
    }

    const subscriptionDetails: SubscriptionDetails = {
      id: targetSubscription.id,
      productId: targetSubscription.productId,
      status: targetSubscription.status,
      amount: targetSubscription.amount,
      currency: targetSubscription.currency,
      recurringInterval: targetSubscription.recurringInterval,
      currentPeriodStart: targetSubscription.currentPeriodStart,
      currentPeriodEnd: targetSubscription.currentPeriodEnd,
      cancelAtPeriodEnd: targetSubscription.cancelAtPeriodEnd,
      canceledAt: targetSubscription.canceledAt,
      organizationId: targetSubscription.organizationId,
    };

    // Check if subscription is still valid
    const currentPeriodEnd = new Date(targetSubscription.currentPeriodEnd);
    
    if (targetSubscription.status !== "active") {
      return {
        hasSubscription: true,
        subscription: subscriptionDetails,
        error: `Subscription is ${targetSubscription.status}`,
        errorType: targetSubscription.canceledAt ? "CANCELED" : "EXPIRED",
      };
    }

    if (currentPeriodEnd <= now) {
      return {
        hasSubscription: true,
        subscription: subscriptionDetails,
        error: "Subscription has expired",
        errorType: "EXPIRED",
      };
    }

    return {
      hasSubscription: true,
      subscription: subscriptionDetails,
    };
  } catch (error) {
    console.error("💥 Error getting subscription details:", error);
    return {
      hasSubscription: false,
      error: "Failed to get subscription details",
      errorType: "GENERAL",
    };
  }
}