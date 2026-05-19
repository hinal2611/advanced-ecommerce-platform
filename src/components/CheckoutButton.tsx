"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [stripeLoading, setStripeLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleStripeCheckout() {
    setStripeLoading(true);

    const response = await fetch("/api/stripe-checkout", {
      method: "POST",
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Stripe checkout failed. Check Stripe API route and .env key.");
      setStripeLoading(false);
    }
  }

  async function handleCheckout() {
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/checkout", {
      method: "POST",
    });

    if (response.ok) {
      setMessage("Order created successfully ✅");
      router.refresh();

      setTimeout(() => {
        router.push("/orders");
      }, 1000);
    } else {
      setMessage("Checkout failed ❌");
    }

    setLoading(false);
  }

  return (
    <div className="mt-6 space-y-3">
      <button
        type="button"
        onClick={handleStripeCheckout}
        disabled={stripeLoading}
        className="w-full rounded-lg bg-purple-600 px-4 py-3 font-medium text-white hover:bg-purple-700 disabled:bg-gray-400"
      >
        {stripeLoading ? "Redirecting to Stripe..." : "Pay with Stripe"}
      </button>

      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Checkout"}
      </button>

      {message && <p className="mt-3 text-sm text-green-600">{message}</p>}
    </div>
  );
}