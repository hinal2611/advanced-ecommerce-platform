import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white px-8 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900">
          ShopSphere
        </Link>

        <div className="flex gap-6 text-sm font-medium text-gray-700">
          <Link href="/products" className="hover:text-black">
            Products
          </Link>
          <Link href="/cart" className="hover:text-black">
            Cart
          </Link>
          <Link href="/orders" className="hover:text-black">
            Orders
          </Link>
          <Link href="/seller" className="hover:text-black">
            Seller
          </Link>
          <Link href="/inventory" className="hover:text-black">
            Inventory
          </Link>
          <Link href="/recommendations" className="hover:text-black">
  AI Recommendations
</Link>
          <Link href="/admin" className="hover:text-black">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}