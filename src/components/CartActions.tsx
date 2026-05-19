"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartActions() {
  const router = useRouter();
  const [stripeLoading, setStripeLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  async function handleStripePayment() {
    setStripeLoading(true);

    const response = await fetch("/api/stripe-checkout", {
      method: "POST",
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
  alert(data.error || "Stripe checkout failed");
  setStripeLoading(false);
}
  }

  async function handleNormalCheckout() {
    setCheckoutLoading(true);

    const response = await fetch("/api/checkout", {
      method: "POST",
    });

    if (response.ok) {
      router.refresh();
      router.push("/orders");
    } else {
      alert("Checkout failed");
    }

    setCheckoutLoading(false);
  }

  return (
    <div className="mt-6 space-y-3">
      <button
        type="button"
        onClick={handleStripePayment}
        disabled={stripeLoading}
        className="w-full rounded-lg bg-purple-600 px-4 py-3 font-medium text-white hover:bg-purple-700 disabled:bg-gray-400"
      >
        {stripeLoading ? "Redirecting to Stripe..." : "Pay with Stripe"}
      </button>

      <button
        type="button"
        onClick={handleNormalCheckout}
        disabled={checkoutLoading}
        className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white disabled:bg-gray-400"
      >
        {checkoutLoading ? "Processing..." : "Create Test Order Without Stripe"}
      </button>
    </div>
  );
}