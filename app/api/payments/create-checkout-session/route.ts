import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { userId, email, priceId, subscription } = await req.json();

  if (subscription) {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{ price: priceId, quantity: 1 }],
        metadata: { userId, email, subscription },
        mode: "subscription",
        success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        allow_promotion_codes: true,
      });


      return NextResponse.json({ sessionId: session.id });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      return NextResponse.json({ error: "Failed to create checkout session" });
    }
  } else {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{ price: priceId, quantity: 1 }],
        metadata: { userId, email, subscription },
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      });

      return NextResponse.json({ sessionId: session.id });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      return NextResponse.json({ error: "Failed to create checkout session" });
    }
  }
}
