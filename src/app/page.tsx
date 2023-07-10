"use client";

import axios from "axios";
import { getStripe } from "./stripe";
import { UserButton } from "@clerk/nextjs";

export default function Page() {
  const handlePurchase = async () => {
    try {
      const { data } = await axios.post(`/api/checkout/`);
      const stripe = await getStripe();
      await stripe?.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handlePurchase}>Subscribe</button>
      <UserButton afterSignOutUrl='/' />
    </div>
  );
}
