/*
  Warnings:

  - Added the required column `customerPhone` to the `JetForSaleMessages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JetForSaleMessages" ADD COLUMN     "customerPhone" TEXT NOT NULL;
