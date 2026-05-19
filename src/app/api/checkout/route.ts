import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const customer = await prisma.customer.findFirst({
      where: {
        email: "customer@shopsphere.com",
      },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    const cartItems = await prisma.cartItem.findMany({
      where: {
        customerId: customer.id,
      },
      include: {
        product: true,
      },
    });

    if (cartItems.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        total,
        status: "Processing",
        items: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    for (const item of cartItems) {
      await prisma.product.update({
        where: {
          id: item.productId,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    await prisma.cartItem.deleteMany({
      where: {
        customerId: customer.id,
      },
    });

    return NextResponse.json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Checkout failed" },
      { status: 500 }
    );
  }
}