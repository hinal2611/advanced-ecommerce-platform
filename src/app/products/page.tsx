import { prisma } from "@/lib/prisma";
import ProductGrid from "@/components/ProductGrid";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-12 text-white shadow-lg">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
              {products.length} products available
            </p>

            <h1 className="text-4xl font-bold md:text-5xl">
              Discover Better Deals
            </h1>

            <p className="mt-4 max-w-2xl text-base text-purple-100 md:text-lg">
              Search products from different stores, save your favorites, and
              open trusted shopping links from Amazon, Walmart, Shein, and more.
            </p>
          </div>
        </section>

        <ProductGrid products={products} />
      </div>
    </main>
  );
}