"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function SaveProductButton({
  productId,
}: {
  productId: number;
}) {
  const supabase = createClient();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      setMessage("Please login to save products.");
      setLoading(false);
      return;
    }

    const response = await fetch("/api/saved-products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        productId,
      }),
    });

    if (response.ok) {
      setMessage("Saved ✅");
    } else {
      setMessage("Failed to save ❌");
    }

    setLoading(false);
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleSave}
        disabled={loading}
        className="mt-3 w-full rounded-lg border border-purple-600 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50 disabled:bg-gray-100"
      >
        {loading ? "Saving..." : "Save Product"}
      </button>

      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
}