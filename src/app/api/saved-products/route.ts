import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, productId } = body;

    if (!email || !productId) {
      return NextResponse.json(
        { error: "Email and productId are required" },
        { status: 400 }
      );
    }

    const user = await prisma.appUser.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    const savedProduct = await prisma.savedProduct.upsert({
      where: {
        userId_productId: {
          userId: user.id,
          productId: Number(productId),
        },
      },
      update: {},
      create: {
        userId: user.id,
        productId: Number(productId),
      },
    });

    return NextResponse.json({
      message: "Product saved successfully",
      savedProduct,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { email, productId } = body;

    const user = await prisma.appUser.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "Nothing to remove" });
    }

    await prisma.savedProduct.deleteMany({
      where: {
        userId: user.id,
        productId: Number(productId),
      },
    });

    return NextResponse.json({
      message: "Product removed from saved list",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove saved product" },
      { status: 500 }
    );
  }
}