import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const totalRevenue = await prisma.order.aggregate({
    _sum: {
      total: true,
    },
  });

  const totalOrders = await prisma.order.count();

  const totalCustomers = await prisma.customer.count();

  const lowStockItems = await prisma.product.count({
    where: {
      stock: {
        lte: 5,
      },
    },
  });

  const topProducts = await prisma.product.findMany({
    orderBy: {
      stock: "asc",
    },
    take: 3,
  });

  const stats = [
    {
      title: "Total Revenue",
      value: `$${(totalRevenue._sum.total || 0).toFixed(2)}`,
      change: "Live DB",
    },
    {
      title: "Orders",
      value: totalOrders.toString(),
      change: "Live DB",
    },
    {
      title: "Customers",
      value: totalCustomers.toString(),
      change: "Live DB",
    },
    {
      title: "Low Stock Items",
      value: lowStockItems.toString(),
      change: "Live DB",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 px-8 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Admin Analytics Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Real-time platform analytics from the database.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>
              <p className="mt-2 text-sm text-green-600">{item.change}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Inventory Health</h2>

            <div className="mt-6 space-y-5">
              {topProducts.map((product) => (
                <div key={product.id}>
                  <div className="flex justify-between text-sm">
                    <span>{product.name}</span>
                    <span>Stock: {product.stock}</span>
                  </div>

                  <div className="mt-2 h-3 rounded bg-gray-200">
                    <div
                      className="h-3 rounded bg-black"
                      style={{
                        width: `${Math.min(product.stock * 3, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Low Stock Products</h2>

            <div className="mt-6 space-y-4">
              {topProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between border-b pb-4 last:border-b-0"
                >
                  <div>
                    <p className="font-medium">
                      {product.image} {product.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {product.category}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      product.stock <= 5
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    Stock: {product.stock}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">AI Business Insights</h2>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="font-semibold">Revenue Insight</h3>
              <p className="mt-2 text-sm text-gray-600">
                Your total revenue is calculated from completed checkout orders.
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="font-semibold">Inventory Alert</h3>
              <p className="mt-2 text-sm text-gray-600">
                Products with stock 5 or less are marked as low stock.
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="font-semibold">Customer Growth</h3>
              <p className="mt-2 text-sm text-gray-600">
                Customer count is pulled directly from your customer table.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}