import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        rating: "desc",
      },
      take: 4,
    });

    const lowStockProducts = await prisma.product.findMany({
      where: {
        stock: {
          lte: 5,
        },
      },
    });

    return NextResponse.json({
      recommendations: products,
      insights: {
        message:
          "Products are recommended based on high rating and inventory availability.",
        lowStockCount: lowStockProducts.length,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load recommendations" },
      { status: 500 }
    );
  }
}