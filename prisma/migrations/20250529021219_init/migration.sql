/*
  Warnings:

  - The primary key for the `JetForCharterMessages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dateRange` on the `JetForCharterMessages` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `JetForCharterMessages` table. All the data in the column will be lost.
  - You are about to alter the column `customerName` on the `JetForCharterMessages` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `customerEmail` on the `JetForCharterMessages` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `customerCountry` on the `JetForCharterMessages` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - Added the required column `arrivalLocation` to the `JetForCharterMessages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureDate` to the `JetForCharterMessages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureLocation` to the `JetForCharterMessages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passengerCount` to the `JetForCharterMessages` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `JetForCharterMessages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `listingId` on the `JetForCharterMessages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `vendorId` on the `JetForCharterMessages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "JetForCharterMessages" DROP CONSTRAINT "JetForCharterMessages_pkey",
DROP COLUMN "dateRange",
DROP COLUMN "message",
ADD COLUMN     "arrivalLocation" VARCHAR(100) NOT NULL,
ADD COLUMN     "departureDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "departureLocation" VARCHAR(100) NOT NULL,
ADD COLUMN     "passengerCount" INTEGER NOT NULL,
ADD COLUMN     "returnDate" TIMESTAMP(3),
ADD COLUMN     "specialRequests" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "customerName" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "customerEmail" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "customerCountry" DROP NOT NULL,
ALTER COLUMN "customerCountry" SET DATA TYPE VARCHAR(100),
DROP COLUMN "listingId",
ADD COLUMN     "listingId" UUID NOT NULL,
DROP COLUMN "vendorId",
ADD COLUMN     "vendorId" UUID NOT NULL,
ADD CONSTRAINT "JetForCharterMessages_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "JetForCharterMessages_listingId_idx" ON "JetForCharterMessages"("listingId");

-- CreateIndex
CREATE INDEX "JetForCharterMessages_vendorId_idx" ON "JetForCharterMessages"("vendorId");
