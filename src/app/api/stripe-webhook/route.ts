// src/api/app/stripe-webhook.ts

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
// import { goPremium } from "@services/supabase/profiles";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json(`Webhook Error: ${(err as Error).message}`);
  }

  if (event!.type === "checkout.session.completed") {
    const session = event!.data.object as Stripe.Checkout.Session;
    const userId = session.metadata!.userId;
    console.log("userId on webhook: ", userId);
    // const response = await goPremium(userId);
    // console.log("response: ", response);
  }

  return NextResponse.json({ received: true });
}
