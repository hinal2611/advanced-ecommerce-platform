export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="px-8 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900">
          Advanced E-Commerce Platform
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
          Enterprise-level online marketplace with admin analytics, seller tools,
          inventory management, AI recommendations, payments, and real-time order tracking.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/products"
            className="rounded-lg bg-black px-6 py-3 font-medium text-white"
          >
            Browse Products
          </a>

          <a
            href="/admin"
            className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-800"
          >
            Admin Dashboard
          </a>
        </div>
      </section>

      <section className="px-8 pb-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">AI Recommendations</h2>
            <p className="mt-2 text-gray-600">
              Suggest products based on user behavior and purchase history.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Seller Dashboard</h2>
            <p className="mt-2 text-gray-600">
              Sellers can manage products, stock, pricing, and sales.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Admin Analytics</h2>
            <p className="mt-2 text-gray-600">
              Admin can monitor revenue, orders, customers, and inventory.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}