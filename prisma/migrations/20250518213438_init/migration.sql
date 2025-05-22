/*
  Warnings:

  - Added the required column `bidding_end_date` to the `JetForBids` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minimum_bid_increment` to the `JetForBids` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JetForBids" ADD COLUMN     "bid_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bidding_end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "bidding_status" TEXT NOT NULL DEFAULT 'OPEN',
ADD COLUMN     "current_bid" DOUBLE PRECISION,
ADD COLUMN     "minimum_bid_increment" DOUBLE PRECISION NOT NULL;
