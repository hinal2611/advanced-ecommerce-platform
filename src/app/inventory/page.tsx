import { prisma } from "@/lib/prisma";

export default async function InventoryPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      stock: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-50 px-8 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Inventory Management
        </h1>

        <p className="mt-2 text-gray-600">
          Track real product stock levels from the database.
        </p>

        <div className="mt-8 overflow-hidden rounded-xl border bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Reorder Level</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => {
                const reorderLevel = 5;

                return (
                  <tr key={product.id} className="border-t">
                    <td className="p-4 font-medium">
                      {product.image} {product.name}
                    </td>

                    <td className="p-4">{product.category}</td>

                    <td className="p-4">${product.price}</td>

                    <td className="p-4">{product.stock}</td>

                    <td className="p-4">{reorderLevel}</td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm ${
                          product.stock <= reorderLevel
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {product.stock <= reorderLevel
                          ? "Low Stock"
                          : "Healthy"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="p-6 text-gray-600">No inventory found.</div>
          )}
        </div>
      </div>
    </main>
  );
}