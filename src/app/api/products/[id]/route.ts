import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const productId = Number(params.id);

    await prisma.cartItem.deleteMany({
      where: { productId },
    });

    await prisma.orderItem.deleteMany({
      where: { productId },
    });

    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const productId = Number(params.id);
    const body = await request.json();

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        stock: Number(body.stock),
      },
    });

    return NextResponse.json({
      message: "Stock updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update stock" },
      { status: 500 }
    );
  }
}