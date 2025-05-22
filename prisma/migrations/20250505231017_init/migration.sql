-- AlterTable
ALTER TABLE "Jet" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);
