-- DropIndex
DROP INDEX "transactions_order_id_key";

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "order_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "transactions_pkey" PRIMARY KEY ("order_id");
