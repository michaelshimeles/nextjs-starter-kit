import { registerPayment } from "@/utils/db/registerPayment";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const res = JSON.parse(payload);
  const sig = req.headers.get("Stripe-Signature");

  const dateTime = new Date(res?.created * 1000).toLocaleDateString();
  const timeString = new Date(res?.created * 1000).toLocaleTimeString();

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log("Event", event?.type);
    // charge.succeeded
    // payment_intent.succeeded
    // payment_intent.created

    /**
    if (event?.type !== "charge.succeeded") {
      return NextResponse.json({
        status: "Different event type",
      });
    }

    const response: any = await registerPayment(
      res?.data?.object?.billing_details?.email, // email
      res?.data?.object?.amount, // amount
      JSON.stringify(res), // payment info
      res?.type, // type
      String(timeString), // time
      String(dateTime), // date
      res?.data?.object?.receipt_email, // email
      res?.data?.object?.receipt_url, // url
      JSON.stringify(res?.data?.object?.payment_method_details), // Payment method details
      JSON.stringify(res?.data?.object?.billing_details), // Billing details
      res?.data?.object?.currency // Currency
    );

    if (response?.message === "success") {
      // console.log("response", response);
      return NextResponse.json({ status: "Success", response });
    }

    if (response?.message === "error") {
      // console.log("response", response);
      return NextResponse.json({
        status: "DB registration error'd",
        response
      });
    }
     */

    return NextResponse.json({
      status: "DB registration didn't work",
      // response,
    });
  } catch (error: any) {
    return NextResponse.json({ status: "Failed", error });
  }
}
