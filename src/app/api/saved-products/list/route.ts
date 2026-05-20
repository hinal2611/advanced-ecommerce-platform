import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await prisma.appUser.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({
        savedProducts: [],
      });
    }

    const savedProducts = await prisma.savedProduct.findMany({
      where: {
        userId: user.id,
      },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      savedProducts,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load saved products" },
      { status: 500 }
    );
  }
}