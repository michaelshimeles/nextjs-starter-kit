import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

export async function POST(req: NextRequest) {
  const reqText = await req.text();
  return webhooksHandler(reqText, req);
}

async function getCustomerEmail(customerId: any) {
  try {
    const customer: any = await stripe.customers.retrieve(customerId);
    return customer.email;
  } catch (error) {
    console.error("Error fetching customer:", error);
    return null;
  }
}

async function webhooksHandler(reqText: string, request: NextRequest): Promise<NextResponse> {
  const sig = request.headers.get("Stripe-Signature");

  try {
    const event = await stripe.webhooks.constructEventAsync(reqText, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
    console.log("event type", event?.type);

    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const customerEmail = await getCustomerEmail(subscription.customer);

        if (customerEmail) {
          const subscriptionData = {
            subscription_id: subscription.id,
            stripe_user_id: subscription.customer,
            status: subscription.status,
            start_date: new Date(subscription.created * 1000).toISOString(),
            plan_id: subscription?.items?.data?.[0]?.price.id,
            user_id: subscription?.metadata?.userId ? subscription?.metadata?.userId : "",
            email: customerEmail,
          };

          const operation = event.type === "customer.subscription.created" ? "insert" : "update";
          const { data, error } = await supabase
            .from("subscriptions")
            [operation](operation === "insert" ? [subscriptionData] : subscriptionData)
            .match({ subscription_id: subscription.id })
            .select();

          if (error) {
            console.error(`Error during subscription ${operation}:`, error);
            return NextResponse.json({ status: 500, error: `Error during subscription ${operation}` });
          }

          return NextResponse.json({ status: 200, message: `Subscription ${operation} success`, data });
        }

        console.error("Customer email could not be fetched.");
        return NextResponse.json({ status: 500, error: "Customer email could not be fetched" });
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customerEmail = await getCustomerEmail(subscription.customer);

        if (customerEmail) {
          const { data, error } = await supabase
            .from("subscriptions")
            .update({ status: "cancelled", email: customerEmail })
            .match({ subscription_id: subscription.id })
            .select();

          if (error) {
            console.error("Error updating subscription (cancelled):", error);
            return NextResponse.json({ status: 500, error: "Error updating subscription (cancelled)" });
          }

          const { data: userData, error: userError } = await supabase
            .from("user")
            .update({ subscription: null })
            .eq("email", customerEmail)
            .select();

          if (userError) {
            console.error("Error updating user subscription status:", userError);
            return NextResponse.json({ status: 500, error: "Error updating user subscription status" });
          }

          return NextResponse.json({ status: 200, message: "Subscription cancelled successfully", userData });
        }

        return NextResponse.json({ status: 500, error: "Customer email could not be fetched" });
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        const customerEmail = await getCustomerEmail(invoice.customer);

        if (customerEmail) {
          const { data, error } = await supabase.from("invoices").insert([{
            invoice_id: invoice.id,
            subscription_id: invoice.subscription,
            amount_paid: invoice.amount_paid / 100,
            currency: invoice.currency,
            status: "paid",
            user_id: invoice?.metadata?.userId,
            email: customerEmail,
          }]);

          if (error) {
            console.error("Error inserting invoice (payment succeeded):", error);
            return NextResponse.json({ status: 500, error: "Error inserting invoice (payment succeeded)" });
          }

          return NextResponse.json({ status: 200, message: "Invoice payment succeeded", data });
        }

        return NextResponse.json({ status: 500, error: "Customer email could not be fetched" });
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const customerEmail = await getCustomerEmail(invoice.customer);

        if (customerEmail) {
          const { data, error } = await supabase.from("invoices").insert([{
            invoice_id: invoice.id,
            subscription_id: invoice.subscription,
            amount_due: invoice.amount_due / 100,
            currency: invoice.currency,
            user_id: invoice?.metadata?.userId,
            status: "failed",
            email: customerEmail,
          }]);

          if (error) {
            console.error("Error inserting invoice (payment failed):", error);
            return NextResponse.json({ status: 500, error: "Error inserting invoice (payment failed)" });
          }

          return NextResponse.json({ status: 200, message: "Invoice payment failed", data });
        }

        return NextResponse.json({ status: 500, error: "Customer email could not be fetched" });
      }
      case "checkout.session.completed": {
        const session = event.data.object;
        const metadata = session.metadata;

        if (metadata?.subscription === "true") {
          const subscriptionId = session.subscription;
          try {
            await stripe.subscriptions.update(String(subscriptionId), { metadata });

            const { data: invoiceData, error: invoiceError } = await supabase
              .from("invoices")
              .update({ user_id: metadata?.userId })
              .eq("email", metadata?.email)
              .select();

            if (invoiceError) {
              return NextResponse.json({ status: 500, error: "Error updating invoice" });
            }

            const { data: userData, error: userError } = await supabase
              .from("user")
              .update({ subscription: session?.id })
              .eq("user_id", metadata?.userId)
              .select();

            if (userError) {
              return NextResponse.json({ status: 500, error: "Error updating user subscription" });
            }

            return NextResponse.json({ status: 200, message: "Subscription metadata updated successfully", userData });
          } catch (error) {
            console.error("Error updating subscription metadata:", error);
            return NextResponse.json({ status: 500, error: "Error updating subscription metadata" });
          }
        } else {
          const dateTime = new Date(session?.created * 1000).toLocaleDateString();
          const timeString = new Date(session?.created * 1000).toLocaleTimeString();

          const { data: user, error: userError } = await supabase
            .from("user")
            .select("*")
            .eq("user_id", metadata?.userId);

          if (userError) {
            return NextResponse.json({ status: 500, error: "Error fetching user" });
          }

          const { data: paymentsData, error: paymentsError } = await supabase
            .from("payments")
            .insert([{
              user_id: metadata?.userId,
              stripe_id: session?.id,
              email: metadata?.email,
              amount: session?.amount_total! / 100,
              customer_details: JSON.stringify(session?.customer_details),
              payment_intent: session?.payment_intent,
              payment_time: timeString,
              payment_date: dateTime,
              currency: session?.currency,
            }])
            .select();

          if (paymentsError) {
            return NextResponse.json({ status: 500, error: "Error inserting payment" });
          }

          if (paymentsData) {
            const { data: creditsData, error: creditsError } = await supabase
              .from("credits")
              .insert([{ user_id: metadata?.userId, email: metadata?.email, credits: 30 }])
              .select();

            if (creditsError) {
              console.error("Error inserting credits:", creditsError);
              return NextResponse.json({ status: 500, error: "Error inserting credits" });
            }

            const updatedCredits = Number(user?.[0]?.credits || 0) + Number(session?.amount_total || 0) / 100;
            const { data: updatedUser, error: userUpdateError } = await supabase
              .from("user")
              .update({ credits: updatedCredits })
              .eq("user_id", metadata?.userId)
              .select();

            if (userUpdateError) {
              return NextResponse.json({ status: 500, error: "Error updating user credits" });
            }

            return NextResponse.json({ status: 200, message: "Payment and credits updated successfully", updatedUser });
          }
        }

        return NextResponse.json({ status: 200, message: "Checkout session completed" });
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
        return NextResponse.json({ status: 400, message: `Unhandled event type: ${event.type}` });
    }
  } catch (error) {
    console.error("Error handling webhook event:", error);
    return NextResponse.json({ status: 500, error: "Error handling webhook event" });
  }
}
