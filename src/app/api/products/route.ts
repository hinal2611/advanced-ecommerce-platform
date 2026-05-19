import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, category, description, price, stock, image, rating } = body;

    const seller = await prisma.seller.findFirst({
      where: {
        email: "seller@shopsphere.com",
      },
    });

    if (!seller) {
      return NextResponse.json(
        { error: "Seller not found" },
        { status: 404 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        category,
        description,
        price: Number(price),
        stock: Number(stock),
        image,
        rating: Number(rating),
        sellerId: seller.id,
      },
    });

    return NextResponse.json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}