import { prisma } from "@/lib/prisma";

export default async function OrdersPage() {
  const customer = await prisma.customer.findFirst({
    where: {
      email: "customer@shopsphere.com",
    },
  });

  const orders = customer
    ? await prisma.order.findMany({
        where: {
          customerId: customer.id,
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : [];

  return (
    <main className="min-h-screen bg-gray-50 px-8 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-900">Order Tracking</h1>

        <p className="mt-2 text-gray-600">
          Track your real orders from the database.
        </p>

        <div className="mt-8 space-y-4">
          {orders.length === 0 ? (
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <p className="text-gray-600">No orders found.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      ORD-{order.id}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {order.createdAt.toDateString()}
                    </p>
                  </div>

                  <span className="rounded-full bg-yellow-100 px-4 py-1 text-sm font-medium text-yellow-700">
                    {order.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm text-gray-700"
                    >
                      <span>
                        {item.product.image} {item.product.name} x{" "}
                        {item.quantity}
                      </span>

                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-between border-t pt-4 font-bold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}