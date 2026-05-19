# Advanced E-Commerce Platform

An enterprise-style e-commerce web application built with Next.js, TypeScript, Prisma, SQLite, Stripe Checkout, and Tailwind CSS.

## Project Highlights

- Full-stack e-commerce workflow
- Product catalog connected with Prisma database
- Add-to-cart and checkout flow
- Stripe Checkout payment integration
- Seller dashboard for product and inventory management
- Admin dashboard with real-time analytics
- AI-style recommendation page
- Order tracking and stock updates
## Features

- Product listing from database
- Add to cart
- Stripe Checkout payment
- Test order creation without Stripe
- Order tracking
- Seller dashboard
- Admin analytics dashboard
- Inventory management
- Add new products
- Delete products
- Update product stock
- AI-style product recommendations

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Prisma ORM
- SQLite
- Stripe Checkout

## Pages

- `/products` - Product catalog
- `/cart` - Cart and checkout
- `/orders` - Customer orders
- `/seller` - Seller dashboard
- `/inventory` - Inventory management
- `/admin` - Admin analytics
- `/recommendations` - AI product recommendations

## Run Locally

```bash
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev