"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type SavedProduct = {
  id: string;
  product: {
    id: number;
    name: string;
    category: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    stock: number;
  };
};

export default function SavedProductsPage() {
  const supabase = createClient();
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([]);
  const [message, setMessage] = useState("Loading saved products...");

  useEffect(() => {
    async function loadSavedProducts() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.email) {
        setMessage("Please login to view saved products.");
        return;
      }

      const response = await fetch(
        `/api/saved-products/list?email=${user.email}`
      );

      const data = await response.json();

      if (response.ok) {
        setSavedProducts(data.savedProducts);
        setMessage("");
      } else {
        setMessage("Failed to load saved products.");
      }
    }

    loadSavedProducts();
  }, [supabase]);

  return (
    <main className="min-h-screen bg-gray-50 px-8 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900">Saved Products</h1>

        <p className="mt-2 text-gray-600">
          Products you save will appear here when you login again.
        </p>

        {message && (
          <div className="mt-8 rounded-xl border bg-white p-6 text-gray-600">
            {message}
          </div>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {savedProducts.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <div className="text-5xl">{item.product.image}</div>

              <p className="mt-4 text-sm text-gray-500">
                {item.product.category}
              </p>

              <h2 className="mt-1 text-lg font-semibold">
                {item.product.name}
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                {item.product.description}
              </p>

              <p className="mt-3 text-xl font-bold">${item.product.price}</p>

              <p className="mt-2 text-sm text-yellow-600">
                ⭐ {item.product.rating}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}