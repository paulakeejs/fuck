/*
  Warnings:

  - You are about to drop the column `vendor` on the `Jet` table. All the data in the column will be lost.
  - Added the required column `vendorId` to the `Jet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jet" DROP COLUMN "vendor",
ADD COLUMN     "exteriorImageUrls" TEXT[],
ADD COLUMN     "interiorImageUrls" TEXT[],
ADD COLUMN     "vendorId" TEXT NOT NULL;
