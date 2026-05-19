import { prisma } from "@/lib/prisma";
import CartActions from "@/components/CartActions";
export default async function CartPage() {
  const customer = await prisma.customer.findFirst({
    where: {
      email: "customer@shopsphere.com",
    },
  });

  const cartItems = customer
    ? await prisma.cartItem.findMany({
        where: {
          customerId: customer.id,
        },
        include: {
          product: true,
        },
      })
    : [];

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-gray-50 px-8 py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>

        <p className="mt-2 text-gray-600">
          Your cart is loaded from the database.
        </p>

        <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b py-4 last:border-b-0"
              >
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {item.product.image} {item.product.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))
          )}

          <div className="mt-6 flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {cartItems.length > 0 && <CartActions />}
        </div>
      </div>
    </main>
  );
}