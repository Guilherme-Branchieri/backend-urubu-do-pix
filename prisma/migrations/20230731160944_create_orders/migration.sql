-- CreateTable
CREATE TABLE "orders" (
    "value" INTEGER NOT NULL,
    "user" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_user_key" ON "orders"("user");
