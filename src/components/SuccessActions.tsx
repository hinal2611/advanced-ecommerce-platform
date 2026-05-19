"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessActions() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [message, setMessage] = useState("Processing your order...");

  useEffect(() => {
    async function createOrderAfterPayment() {
      const paid = searchParams.get("paid");

      if (paid !== "true") {
        setMessage("Payment status not confirmed.");
        return;
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
      });

      if (response.ok) {
        setMessage("Order created successfully ✅");

        setTimeout(() => {
          router.push("/orders");
        }, 1500);
      } else {
        setMessage("Payment was successful, but order creation failed.");
      }
    }

    createOrderAfterPayment();
  }, [router, searchParams]);

  return (
    <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
      <p className="text-lg font-medium text-gray-800">{message}</p>
    </div>
  );
}