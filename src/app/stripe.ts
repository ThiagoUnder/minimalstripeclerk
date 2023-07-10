import StripeLoader from "stripe";
import { loadStripe, Stripe } from "@stripe/stripe-js";

export const stripe = new StripeLoader(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
  appInfo: {
    name: "Minimal Stripe",
    version: "0.1.0",
  },
});

let stripePromise: Promise<Stripe | null> | undefined;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};
