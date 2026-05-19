import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId } = body;

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

    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        customerId: customer.id,
        productId: Number(productId),
      },
    });

    if (existingCartItem) {
      await prisma.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          customerId: customer.id,
          productId: Number(productId),
          quantity: 1,
        },
      });
    }

    return NextResponse.json({
      message: "Product added to cart",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}