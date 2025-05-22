/*
  Warnings:

  - The `cabinFeatures` column on the `JetForCharter` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `exteriorImages` column on the `JetForCharter` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `interiorImages` column on the `JetForCharter` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `vendorId` to the `JetForCharter` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tripOption` on the `JetForCharter` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `additionalFees` on the `JetForCharter` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TripOption" AS ENUM ('ROUND_TRIP', 'ONE_WAY', 'BOTH');

-- AlterTable
ALTER TABLE "JetForCharter" ADD COLUMN     "vendorId" TEXT NOT NULL,
DROP COLUMN "tripOption",
ADD COLUMN     "tripOption" "TripOption" NOT NULL,
DROP COLUMN "additionalFees",
ADD COLUMN     "additionalFees" JSONB NOT NULL,
DROP COLUMN "cabinFeatures",
ADD COLUMN     "cabinFeatures" TEXT[],
DROP COLUMN "exteriorImages",
ADD COLUMN     "exteriorImages" TEXT[],
DROP COLUMN "interiorImages",
ADD COLUMN     "interiorImages" TEXT[];
