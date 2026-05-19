import { prisma } from "@/lib/prisma";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-50 px-8 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>

        <p className="mt-2 text-gray-600">
          Browse products loaded from the database.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="text-5xl">{product.image}</div>

              <p className="mt-4 text-sm text-gray-500">{product.category}</p>

              <h2 className="mt-1 text-lg font-semibold text-gray-900">
                {product.name}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {product.description}
              </p>

              <p className="mt-3 text-xl font-bold">${product.price}</p>

              <div className="mt-2 flex justify-between text-sm">
                <span className="text-yellow-600">⭐ {product.rating}</span>

                <span
                  className={
                    product.stock <= 5 ? "text-red-600" : "text-green-600"
                  }
                >
                  Stock: {product.stock}
                </span>
              </div>

              <AddToCartButton productId={product.id} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}