"use client";

export default function StripeCheckoutButton() {
  return (
    <button
      type="button"
      className="mt-4 w-full rounded-lg bg-purple-600 px-4 py-3 font-medium text-white"
      onClick={() => alert("Stripe button is working")}
    >
      Pay with Stripe
    </button>
  );
}