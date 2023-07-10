// src/api/app/checkout.ts

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest) {
  // const { userId } = await req.json();
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: process.env.STRIPE_PRODUCT_ID!, quantity: 1 }],
      mode: "subscription",
      payment_method_types: ["card"],
      success_url: "http://localhost:3000",
      cancel_url: "http://localhost:3000",
      metadata: { userId: "123" },
    });
    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error(err);
  }
}
