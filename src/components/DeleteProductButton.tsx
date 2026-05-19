"use client";

import { useRouter } from "next/navigation";

export default function DeleteProductButton({ productId }: { productId: number }) {
  const router = useRouter();

  async function handleDelete() {
    const ok = window.confirm("Delete this product?");
    if (!ok) return;

    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.refresh();
    } else {
      alert("Delete failed");
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      style={{
        backgroundColor: "red",
        color: "white",
        padding: "8px 14px",
        borderRadius: "8px",
        fontWeight: "bold",
      }}
    >
      Delete
    </button>
  );
}