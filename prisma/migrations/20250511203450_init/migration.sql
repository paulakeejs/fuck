/*
  Warnings:

  - Added the required column `message` to the `JetForSaleMessages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JetForSaleMessages" ADD COLUMN     "message" TEXT NOT NULL;
