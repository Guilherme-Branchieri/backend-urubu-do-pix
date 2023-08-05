/*
  Warnings:

  - The required column `id` was added to the `orders` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "orders_user_key";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL,
ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "updated_at" DROP NOT NULL;
