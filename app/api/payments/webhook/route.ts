import { db } from "@/db/drizzle";
import { invoices, subscriptions, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  console.log('🔄 Webhook request received');
  const reqText = await req.text();
  console.log('📝 Request headers:', Object.fromEntries(req.headers.entries()));
  return webhooksHandler(reqText, req);
}

async function getCustomerEmail(customerId: string): Promise<string | null> {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return (customer as Stripe.Customer).email;
  } catch (error) {
    console.error("Error fetching customer:", error);
    return null;
  }
}

async function handleSubscriptionEvent(
  event: Stripe.Event,
  type: "created" | "updated" | "deleted"
) {

  const subscription = event.data.object as Stripe.Subscription;
  const customerEmail = await getCustomerEmail(subscription.customer as string);

  if (!customerEmail) {
    return NextResponse.json({
      status: 500,
      error: "Customer email could not be fetched",
    });
  }

  const subscriptionData = {
    subscriptionId: subscription.id,
    stripeUserId: subscription.customer as string,
    status: subscription.status,
    startDate: new Date(subscription.created * 1000).toISOString(),
    planId: subscription.items.data[0]?.price.id,
    userId: subscription.metadata?.userId || "",
    email: customerEmail,
  };

  console.log('📝 Subscription data:', subscriptionData);

  try {
    if (type === "deleted") {
      // Update subscriptions table
      await db
        .update(subscriptions)
        .set({
          status: "cancelled",
          email: customerEmail,
        })
        .where(eq(subscriptions.subscriptionId, subscription.id));

      // Update user table to remove subscription
      await db
        .update(users)
        .set({ subscription: null })
        .where(eq(users.email, customerEmail));
    } else {
      // Either insert or update subscription based on type
      if (type === "created") {
        const insertedData = await db
          .insert(subscriptions)
          .values(subscriptionData)
          .returning();

        return NextResponse.json({
          status: 200,
          message: "Subscription created successfully",
          data: insertedData,
        });
      } else {
        const updatedData = await db
          .update(subscriptions)
          .set(subscriptionData)
          .where(eq(subscriptions.subscriptionId, subscription.id))
          .returning();

        return NextResponse.json({
          status: 200,
          message: "Subscription updated successfully",
          data: updatedData,
        });
      }
    }

    return NextResponse.json({
      status: 200,
      message: `Subscription ${type} success`,
    });
  } catch (error) {
    console.error(`Error during subscription ${type}:`, error);
    return NextResponse.json({
      status: 500,
      error: `Error during subscription ${type}`,
    });
  }
}

async function handleInvoiceEvent(
  event: Stripe.Event,
  status: "succeeded" | "failed"
) {
  const invoice = event.data.object as Stripe.Invoice;
  const customerEmail = await getCustomerEmail(invoice.customer as string);

  console.log('📊 Invoice details:', {
    email: customerEmail,
    amount: invoice.amount_paid,
    currency: invoice.currency,
    metadata: invoice.metadata
  });

  if (!customerEmail) {
    return NextResponse.json({
      status: 500,
      error: "Customer email could not be fetched",
    });
  }

  const invoiceData = {
    invoiceId: invoice.id,
    subscriptionId: invoice.subscription as string,
    amountPaid: status === "succeeded" ? String(invoice.amount_paid / 100) : undefined,
    amountDue: status === "failed" ? String(invoice.amount_due / 100) : undefined,
    currency: invoice.currency,
    status,
    userId: invoice.metadata?.userId,
    email: customerEmail,
  };

  try {
    const insertedInvoice = await db
      .insert(invoices)
      .values(invoiceData)
      .returning();

    return NextResponse.json({
      status: 200,
      message: `Invoice payment ${status}`,
      data: insertedInvoice,
    });
  } catch (error) {
    console.error(`Error inserting invoice (payment ${status}):`, error);
    return NextResponse.json({
      status: 500,
      error: `Error inserting invoice (payment ${status})`,
    });
  }
}

async function handleCheckoutSessionCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;
  const metadata: any = session?.metadata;

  console.log('🏷️ Session metadata:', metadata);

  if (metadata?.subscription === "true") {
    // This is for subscription payments
    const subscriptionId = session.subscription;
    try {
      // Update subscription metadata in Stripe
      await stripe.subscriptions.update(subscriptionId as string, { metadata });

      // Update invoice with user ID
      await db
        .update(invoices)
        .set({ userId: metadata?.userId })
        .where(eq(invoices.email, metadata?.email));

      // Update user's subscription
      await db
        .update(users)
        .set({ subscription: session.id })
        .where(eq(users.userId, metadata?.userId));

      return NextResponse.json({
        status: 200,
        message: "Subscription metadata updated successfully",
      });
    } catch (error) {
      console.error("Error updating subscription metadata:", error);
      return NextResponse.json({
        status: 500,
        error: "Error updating subscription metadata",
      });
    }
  } else {
    // This is for one-time payments
    const dateTime = new Date(session.created * 1000).toISOString();
    try {
      // Fetch user
      // const user = await db.query.users.findFirst({
      //   where: eq(users.userId, metadata?.userId),
      // });

      // if (!user) {
      //   throw new Error("User not found");
      // }

      // const paymentData = {
      //   userId: metadata?.userId,
      //   stripeId: session.id,
      //   email: metadata?.email,
      //   amount: String(session.amount_total! / 100),
      //   customerDetails: JSON.stringify(session.customer_details),
      //   paymentIntent: session.payment_intent as string,
      //   paymentTime: dateTime,
      //   currency: session.currency,
      // };

      // // Insert payment
      // const insertedPayment = await db
      //   .insert(payments)
      //   .values(paymentData)
      //   .returning();

      // // Calculate and update user credits
      // const currentCredits = Number(user.credits || 0);
      // const updatedCredits = currentCredits + (session.amount_total || 0) / 100;

      // const updatedUser = await db
      //   .update(users)
      //   .set({ credits: String(updatedCredits) })
      //   .where(eq(users.userId, metadata?.userId))
      //   .returning();

      return NextResponse.json({
        status: 200,
        message: "Payment and credits updated successfully",
        // updatedUser,
      });
    } catch (error) {
      console.error("Error handling checkout session:", error);
      return NextResponse.json({
        status: 500,
        error: String(error),
      });
    }
  }
}

async function webhooksHandler(
  reqText: string,
  request: NextRequest
): Promise<NextResponse> {
  console.log('🎯 Processing webhook request');
  const sig = request.headers.get("Stripe-Signature");
  console.log('🔑 Stripe signature present:', !!sig);

  try {
    console.log('🔄 Constructing Stripe event...');
    const event = await stripe.webhooks.constructEventAsync(
      reqText,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log('✅ Event constructed successfully:', {
      type: event.type,
      id: event.id,
      apiVersion: event.api_version
    });

    switch (event.type) {
      case "customer.subscription.created":
        return handleSubscriptionEvent(event, "created");
      case "customer.subscription.updated":
        return handleSubscriptionEvent(event, "updated");
      case "customer.subscription.deleted":
        return handleSubscriptionEvent(event, "deleted");
      case "invoice.payment_succeeded":
        return handleInvoiceEvent(event, "succeeded");
      case "invoice.payment_failed":
        return handleInvoiceEvent(event, "failed");
      case "checkout.session.completed":
        return handleCheckoutSessionCompleted(event);
      default:
        return NextResponse.json({
          status: 400,
          error: "Unhandled event type",
        });
    }
  } catch (err) {
    console.error("Error constructing Stripe event:", err);
    return NextResponse.json({
      status: 500,
      error: "Webhook Error: Invalid Signature",
    });
  }
}
