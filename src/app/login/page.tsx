"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignUp() {
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Account created. Please check your email if confirmation is enabled.");
  }

  async function handleLogin() {
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push("/products");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-gray-50 px-8 py-20">
      <div className="mx-auto max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">Login</h1>

        <p className="mt-2 text-gray-600">
          Login or create an account to save products.
        </p>

        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-lg border px-4 py-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border px-4 py-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white"
          >
            Login
          </button>

          <button
            onClick={handleSignUp}
            className="w-full rounded-lg bg-purple-600 px-4 py-3 font-medium text-white"
          >
            Create Account
          </button>

          {message && (
            <p className="rounded-lg bg-gray-100 p-3 text-sm text-gray-700">
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}