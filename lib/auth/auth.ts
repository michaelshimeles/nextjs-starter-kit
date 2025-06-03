import { db } from "@/db/drizzle";
import {
  member,
  organization as organizationSchema,
  subscription,
} from "@/db/schema";
import {
  checkout,
  polar,
  portal,
  usage,
  webhooks,
} from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { organization } from "better-auth/plugins"; // Keep this as 'organization'
import { and, eq } from "drizzle-orm";
import { Pool } from "pg";
import { sendOrganizationInvitation } from "../email";

// Utility function to safely parse dates
function safeParseDate(value: string | Date | null | undefined): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  return new Date(value);
}

const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: "sandbox",
});

export const auth = betterAuth({
  trustedOrigins: [
    "http://localhost:3000",
    `${process.env.NEXT_PUBLIC_APP_URL}`,
    `${process.env.NEXT_PUBLIC_APP_WWW_URL}`,
  ],
  allowedDevOrigins: [
    "http://localhost:3000",
    `${process.env.NEXT_PUBLIC_APP_URL}`,
    `${process.env.NEXT_PUBLIC_APP_WWW_URL}`,
  ],
  cookieCache: {
    enabled: true,
    maxAge: 5 * 60, // Cache duration in seconds
  },
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    organization({
      async sendInvitationEmail(data) {
        const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/accept-invitation/${data.id}`;
        sendOrganizationInvitation({
          email: data.email,
          invitedByUsername: data.inviter.user.name,
          invitedByEmail: data.inviter.user.email,
          teamName: data.organization.name,
          inviteLink,
        });
      },
      organizationCreation: {
        disabled: false, // Set to true to disable organization creation
        beforeCreate: async ({ organization, user }, request) => {
          console.log("organization", organization);
          console.log("user", user);
          console.log("request", request);
          try {
            // Run custom logic before organization is created
            // Optionally modify the organization data
            return {
              data: {
                ...organization,
                metadata: {
                  customField: "value",
                },
              },
            };
          } catch (error) {
            throw error;
          }
        },
        afterCreate: async ({ organization, member, user }, request) => {
          console.log("organization", organization);
          console.log("member", member);
          console.log("user", user);
          console.log("request", request);
          try {
            // Run custom logic after organization is created
            // e.g., create default resources, send notifications
            // await setupDefaultResources(organization.id);
          } catch (error) {
            // Log but don't throw to avoid breaking organization creation
            console.error("Error in afterCreate hook:", error);
          }
        },
      },
    }),
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId:
                process.env.NEXT_PUBLIC_STARTER_TIER ||
                (() => {
                  throw new Error(
                    "NEXT_PUBLIC_STARTER_TIER environment variable is required",
                  );
                })(),
              slug:
                process.env.NEXT_PUBLIC_STARTER_SLUG ||
                (() => {
                  throw new Error(
                    "NEXT_PUBLIC_STARTER_SLUG environment variable is required",
                  );
                })(),
            },
            {
              productId:
                process.env.NEXT_PUBLIC_PROFESSIONAL_TIER ||
                (() => {
                  throw new Error(
                    "NEXT_PUBLIC_PROFESSIONAL_TIER environment variable is required",
                  );
                })(),
              slug:
                process.env.NEXT_PUBLIC_PROFESSIONAL_SLUG ||
                (() => {
                  throw new Error(
                    "NEXT_PUBLIC_PROFESSIONAL_SLUG environment variable is required",
                  );
                })(),
            },
          ],
          successUrl: process.env.POLAR_SUCCESS_URL,
          authenticatedUsersOnly: true,
        }),
        portal(),
        usage(),
        webhooks({
          secret:
            process.env.POLAR_WEBHOOK_SECRET ||
            (() => {
              throw new Error(
                "POLAR_WEBHOOK_SECRET environment variable is required",
              );
            })(),
          onPayload: async ({ data, type }) => {
            if (
              type === "subscription.created" ||
              type === "subscription.active" ||
              type === "subscription.canceled" ||
              type === "subscription.revoked" ||
              type === "subscription.uncanceled" ||
              type === "subscription.updated"
            ) {
              console.log("🎯 Processing subscription webhook:", type);
              console.log("📦 Payload data:", JSON.stringify(data, null, 2));

              try {
                // STEP 1: Extract user ID from customer data
                const userId = data.customer?.externalId;
                let organizationId = null;

                console.log("👤 Customer data:", {
                  customerId: data.customerId,
                  userId: userId,
                  polarOrgId: data.customer?.organizationId,
                });

                // STEP 2: Map to local organization
                if (userId) {
                  // First try: Get user's admin organizations (they pay for subscriptions)
                  const adminMemberships = await db
                    .select({ organizationId: member.organizationId })
                    .from(member)
                    .where(
                      and(
                        eq(member.userId, userId),
                        eq(member.role, "admin"), // Admins are the ones who can have subscriptions
                      ),
                    );

                  if (adminMemberships.length > 0) {
                    organizationId = adminMemberships[0].organizationId;
                    console.log("✅ Found admin organization:", organizationId);
                  } else {
                    // Fallback: Get any organization they're a member of
                    const anyMemberships = await db
                      .select({ organizationId: member.organizationId })
                      .from(member)
                      .where(eq(member.userId, userId))
                      .limit(1);

                    if (anyMemberships.length > 0) {
                      organizationId = anyMemberships[0].organizationId;
                      console.log(
                        "✅ Found member organization:",
                        organizationId,
                      );
                    } else {
                      console.log("❌ No organization found for user:", userId);
                    }
                  }
                }

                // STEP 3: Additional fallback - check metadata for referenceId
                if (!organizationId && data.metadata?.referenceId) {
                  // Check if referenceId is actually an organizationId
                  const referenceId = String(data.metadata.referenceId);
                  const orgExists = await db
                    .select({ id: organizationSchema.id })
                    .from(organizationSchema)
                    .where(eq(organizationSchema.id, referenceId))
                    .limit(1);

                  if (orgExists.length > 0) {
                    organizationId = referenceId;
                    console.log(
                      "✅ Found organization from metadata:",
                      organizationId,
                    );
                  }
                }

                // STEP 4: Build subscription data
                const subscriptionData = {
                  id: data.id,
                  createdAt: new Date(data.createdAt),
                  modifiedAt: safeParseDate(data.modifiedAt),
                  amount: data.amount,
                  currency: data.currency,
                  recurringInterval: data.recurringInterval,
                  status: data.status,
                  currentPeriodStart:
                    safeParseDate(data.currentPeriodStart) || new Date(),
                  currentPeriodEnd:
                    safeParseDate(data.currentPeriodEnd) || new Date(),
                  cancelAtPeriodEnd: data.cancelAtPeriodEnd || false,
                  canceledAt: safeParseDate(data.canceledAt),
                  startedAt: safeParseDate(data.startedAt) || new Date(),
                  endsAt: safeParseDate(data.endsAt),
                  endedAt: safeParseDate(data.endedAt),
                  customerId: data.customerId,
                  productId: data.productId,
                  discountId: data.discountId || null,
                  checkoutId: data.checkoutId || "",
                  customerCancellationReason:
                    data.customerCancellationReason || null,
                  customerCancellationComment:
                    data.customerCancellationComment || null,
                  metadata: data.metadata
                    ? JSON.stringify(data.metadata)
                    : null,
                  customFieldData: data.customFieldData
                    ? JSON.stringify(data.customFieldData)
                    : null,
                  organizationId: organizationId as string | null,
                  userId: userId as string | null,
                };

                console.log("💾 Final subscription data:", {
                  id: subscriptionData.id,
                  status: subscriptionData.status,
                  organizationId: subscriptionData.organizationId,
                  userId: subscriptionData.userId,
                  amount: subscriptionData.amount,
                });

                // STEP 5: Upsert subscription
                const existingSubscription = await db
                  .select()
                  .from(subscription)
                  .where(eq(subscription.id, data.id))
                  .limit(1);

                if (existingSubscription.length > 0) {
                  await db
                    .update(subscription)
                    .set({
                      status: subscriptionData.status,
                      currentPeriodEnd: subscriptionData.currentPeriodEnd,
                      modifiedAt: subscriptionData.modifiedAt || new Date(),
                      organizationId: organizationId as string | null,
                      userId: userId as string | null,
                    })
                    .where(eq(subscription.id, data.id));
                  console.log("✅ Updated subscription:", data.id);
                } else {
                  if (!organizationId) {
                    console.log(
                      "⚠️ Warning: Creating subscription without organizationId",
                    );
                  }
                  await db.insert(subscription).values(subscriptionData);
                  console.log("✅ Created subscription:", data.id);
                }
              } catch (error) {
                console.error(
                  "💥 Error processing subscription webhook:",
                  error,
                );
                // Don't throw - let webhook succeed to avoid retries
              }
            }
          },
        }),
      ],
    }),
    nextCookies(),
  ],
});
