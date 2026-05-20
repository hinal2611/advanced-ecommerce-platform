"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UpdateStockButton({
  productId,
  currentStock,
}: {
  productId: number;
  currentStock: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleUpdateStock() {
    const newStock = window.prompt(
      "Enter new stock quantity:",
      currentStock.toString()
    );

    if (newStock === null) return;

    if (Number(newStock) < 0 || Number.isNaN(Number(newStock))) {
      alert("Please enter a valid stock number.");
      return;
    }

    setLoading(true);

    const response = await fetch(`/api/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stock: Number(newStock),
      }),
    });

    if (response.ok) {
      router.refresh();
    } else {
      alert("Failed to update stock.");
    }

    setLoading(false);
  }

  return (
    <button
      type="button"
      onClick={handleUpdateStock}
      disabled={loading}
      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
    >
      {loading ? "Updating..." : "Update Stock"}
    </button>
  );
}