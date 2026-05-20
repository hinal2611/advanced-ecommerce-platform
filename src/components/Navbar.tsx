import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/90 px-6 py-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          DealNest
        </Link>

        <div className="hidden gap-6 text-sm font-medium text-gray-700 md:flex">
          <Link href="/" className="hover:text-purple-600">
            Home
          </Link>

          <Link href="/products" className="hover:text-purple-600">
            Products
          </Link>

          <Link href="/saved" className="hover:text-purple-600">
            Saved
          </Link>

          <Link href="/cart" className="hover:text-purple-600">
            Cart
          </Link>

          <Link href="/orders" className="hover:text-purple-600">
            Orders
          </Link>

          <Link href="/recommendations" className="hover:text-purple-600">
            AI Picks
          </Link>

          <Link href="/seller" className="hover:text-purple-600">
            Admin
          </Link>
        </div>

        <Link
          href="/login"
          className="rounded-full bg-purple-600 px-5 py-2 text-sm font-medium text-white hover:bg-purple-700"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}