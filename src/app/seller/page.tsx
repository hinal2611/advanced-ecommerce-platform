import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/ProductForm";
import DeleteProductButton from "@/components/DeleteProductButton";
import UpdateStockButton from "@/components/UpdateStockButton";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";

export default async function SellerDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdmin(user?.email)) {
    redirect("/products");
  }

  const seller = await prisma.seller.findFirst({
    where: {
      email: "seller@shopsphere.com",
    },
  });

  const products = seller
    ? await prisma.product.findMany({
        where: {
          sellerId: seller.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : [];

  const totalProducts = products.length;

  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);

  const lowStockProducts = products.filter((product) => product.stock <= 5);

  const inventoryValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );

  return (
    <main className="min-h-screen bg-gray-50 px-8 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>

        <p className="mt-2 text-gray-600">
          Manage products, inventory, external store links, and seller
          performance from the database.
        </p>

        <ProductForm />

        <div className="mt-8 grid gap-6 md:grid-cols-4">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Products</p>
            <h2 className="mt-2 text-3xl font-bold">{totalProducts}</h2>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Stock</p>
            <h2 className="mt-2 text-3xl font-bold">{totalStock}</h2>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Low Stock</p>
            <h2 className="mt-2 text-3xl font-bold">
              {lowStockProducts.length}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Inventory Value</p>
            <h2 className="mt-2 text-3xl font-bold">
              ${inventoryValue.toFixed(2)}
            </h2>
          </div>
        </div>

        <div className="mt-8 overflow-x-auto rounded-xl border bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Brand</th>
                <th className="p-4">Category</th>
                <th className="p-4">Store</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="p-4 font-medium">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="mb-2 h-12 w-12 rounded-lg object-cover"
                      />
                    ) : (
                      <span className="mr-2">{product.image}</span>
                    )}

                    {product.name}
                  </td>

                  <td className="p-4">{product.brand || "N/A"}</td>

                  <td className="p-4">{product.category}</td>

                  <td className="p-4">
                    {product.storeName ? (
                      <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                        {product.storeName}
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </td>

                  <td className="p-4">${product.price.toFixed(2)}</td>

                  <td className="p-4">{product.stock}</td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        product.stock <= 5
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {product.stock <= 5 ? "Low Stock" : "Active"}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <UpdateStockButton
                        productId={product.id}
                        currentStock={product.stock}
                      />

                      <DeleteProductButton productId={product.id} />
                    </div>

                    {product.externalUrl && (
                      <a
                        href={product.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 block text-sm font-medium text-purple-600 hover:underline"
                      >
                        Open Link
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="p-6 text-gray-600">No products found.</div>
          )}
        </div>
      </div>
    </main>
  );
}