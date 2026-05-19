"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    image: "📦",
    rating: "4.5",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      setMessage("Product added successfully ✅");

      setForm({
        name: "",
        category: "",
        description: "",
        price: "",
        stock: "",
        image: "📦",
        rating: "4.5",
      });

      router.refresh();
    } else {
      setMessage("Failed to add product ❌");
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-xl border bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product name"
          required
          className="rounded-lg border px-4 py-3"
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          required
          className="rounded-lg border px-4 py-3"
        />

        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          step="0.01"
          required
          className="rounded-lg border px-4 py-3"
        />

        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          type="number"
          required
          className="rounded-lg border px-4 py-3"
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Emoji image"
          className="rounded-lg border px-4 py-3"
        />

        <input
          name="rating"
          value={form.rating}
          onChange={handleChange}
          placeholder="Rating"
          type="number"
          step="0.1"
          className="rounded-lg border px-4 py-3"
        />
      </div>

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Product description"
        required
        className="mt-4 w-full rounded-lg border px-4 py-3"
      />

      <button
        type="submit"
        disabled={loading}
        className="mt-5 rounded-lg bg-black px-6 py-3 font-medium text-white disabled:bg-gray-400"
      >
        {loading ? "Adding..." : "Add Product"}
      </button>

      {message && <p className="mt-3 text-sm text-green-600">{message}</p>}
    </form>
  );
}