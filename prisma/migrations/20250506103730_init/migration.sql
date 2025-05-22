/*
  Warnings:

  - Added the required column `paymentSignature` to the `Jet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jet" ADD COLUMN     "paymentSignature" TEXT NOT NULL;
