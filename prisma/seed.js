const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.cartItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.seller.deleteMany();

  const seller = await prisma.seller.create({
    data: {
      name: "ShopSphere Seller",
      email: "seller@shopsphere.com",
    },
  });

  const customer = await prisma.customer.create({
    data: {
      name: "Demo Customer",
      email: "customer@shopsphere.com",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Wireless Headphones",
        category: "Electronics",
        description: "Premium wireless headphones with long battery life.",
        price: 89.99,
        stock: 24,
        image: "🎧",
        rating: 4.7,
        sellerId: seller.id,
      },
      {
        name: "Smart Watch",
        category: "Wearables",
        description: "Modern smart watch with health tracking features.",
        price: 149.99,
        stock: 12,
        image: "⌚",
        rating: 4.5,
        sellerId: seller.id,
      },
      {
        name: "Gaming Keyboard",
        category: "Accessories",
        description: "Mechanical gaming keyboard with RGB lighting.",
        price: 69.99,
        stock: 30,
        image: "⌨️",
        rating: 4.8,
        sellerId: seller.id,
      },
      {
        name: "Bluetooth Speaker",
        category: "Audio",
        description: "Portable Bluetooth speaker with powerful sound.",
        price: 59.99,
        stock: 5,
        image: "🔊",
        rating: 4.4,
        sellerId: seller.id,
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      customerId: customer.id,
      productId: 1,
      quantity: 1,
    },
  });

  console.log("Database seeded successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });