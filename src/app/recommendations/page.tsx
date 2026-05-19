import { prisma } from "@/lib/prisma";

export default async function RecommendationsPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      rating: "desc",
    },
    take: 4,
  });

  const lowStockProducts = await prisma.product.count({
    where: {
      stock: {
        lte: 5,
      },
    },
  });

  return (
    <main className="min-h-screen bg-gray-50 px-8 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900">
          AI Product Recommendations
        </h1>

        <p className="mt-2 text-gray-600">
          Smart product recommendations based on rating, demand, and inventory.
        </p>

        <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">AI Insight Summary</h2>

          <p className="mt-3 text-gray-600">
            The system recommends top-rated products first. It also monitors
            low-stock products to help sellers restock popular items.
          </p>

          <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-yellow-800">
            Low stock products detected: {lowStockProducts}
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <div className="text-5xl">{product.image}</div>

              <p className="mt-4 text-sm text-gray-500">{product.category}</p>

              <h2 className="mt-1 text-lg font-semibold text-gray-900">
                {product.name}
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                {product.description}
              </p>

              <div className="mt-4 flex justify-between text-sm">
                <span className="text-yellow-600">⭐ {product.rating}</span>
                <span className="text-green-600">Stock: {product.stock}</span>
              </div>

              <p className="mt-3 text-xl font-bold">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}