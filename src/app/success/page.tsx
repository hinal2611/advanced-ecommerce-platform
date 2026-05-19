import Link from "next/link";
import { Suspense } from "react";
import SuccessActions from "@/components/SuccessActions";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-8 py-20 text-center">
      <h1 className="text-4xl font-bold text-green-700">
        Payment Successful ✅
      </h1>

      <p className="mt-4 text-gray-600">
        Your Stripe test payment was completed successfully.
      </p>

      <Suspense fallback={<p className="mt-6">Loading order...</p>}>
        <SuccessActions />
      </Suspense>

      <div className="mt-8 flex justify-center gap-4">
        <Link
          href="/orders"
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          View Orders
        </Link>

        <Link
          href="/products"
          className="rounded-lg border px-6 py-3 text-gray-800"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}