"use client";

import { useState } from "react";

type AddToCartButtonProps = {
  productId: number;
};

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleAddToCart() {
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    if (response.ok) {
      setMessage("Added to cart ✅");
    } else {
      setMessage("Failed to add ❌");
    }

    setLoading(false);
  }

  return (
    <div>
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="mt-5 w-full rounded-lg bg-black px-4 py-2 text-white disabled:bg-gray-400"
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>

      {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
    </div>
  );
}