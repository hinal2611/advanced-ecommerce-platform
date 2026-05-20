"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Store, Star } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import SaveProductButton from "@/components/SaveProductButton";

type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  imageUrl: string | null;
  brand: string | null;
  storeName: string | null;
  externalUrl: string | null;
  rating: number;
};

export default function ProductGrid({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStore, setSelectedStore] = useState("All");

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  }, [products]);

  const stores = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(products.map((p) => p.storeName).filter(Boolean) as string[])
      ),
    ];
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(searchText) ||
      product.description.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText) ||
      product.brand?.toLowerCase().includes(searchText) ||
      product.storeName?.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesStore =
      selectedStore === "All" || product.storeName === selectedStore;

    return matchesSearch && matchesCategory && matchesStore;
  });

  return (
    <section className="mt-8 overflow-hidden">
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, brands, stores..."
              className="w-full rounded-xl border px-10 py-3 outline-none focus:border-purple-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-purple-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-purple-500"
          >
            {stores.map((store) => (
              <option key={store} value={store}>
                {store}
              </option>
            ))}
          </select>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.35 }}
            className="overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="bg-gray-100 p-4">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-44 w-full rounded-xl object-cover transition duration-300 hover:scale-105"
                />
              ) : (
                <div className="flex h-44 items-center justify-center rounded-xl bg-white text-6xl">
                  {product.image}
                </div>
              )}
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-gray-500">{product.category}</p>

                {product.storeName && (
                  <span className="flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                    <Store className="h-3 w-3" />
                    {product.storeName}
                  </span>
                )}
              </div>

              <h2 className="mt-3 text-lg font-semibold text-gray-900">
                {product.name}
              </h2>

              {product.brand && (
                <p className="mt-1 text-sm text-gray-500">
                  Brand: {product.brand}
                </p>
              )}

              <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                {product.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </p>

                <p className="flex items-center gap-1 text-sm text-yellow-600">
                  <Star className="h-4 w-4 fill-yellow-500" />
                  {product.rating}
                </p>
              </div>

              <div className="mt-2 flex items-center justify-between text-sm">
                <span
                  className={
                    product.stock <= 5 ? "text-red-600" : "text-green-600"
                  }
                >
                  Stock: {product.stock}
                </span>

                {product.stock <= 5 && (
                  <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                    Low Stock
                  </span>
                )}
              </div>

              <div className="mt-5 space-y-3">
                {product.externalUrl && (
                  <a
                    href={product.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-lg bg-purple-600 px-4 py-2 text-center font-medium text-white transition hover:bg-purple-700"
                  >
                    View on {product.storeName || "Store"}
                  </a>
                )}

                <AddToCartButton productId={product.id} />

                <SaveProductButton productId={product.id} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="mt-8 rounded-xl border bg-white p-8 text-center text-gray-600">
          No products found. Try another search or filter.
        </div>
      )}
    </section>
  );
}