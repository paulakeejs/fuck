/*
  Warnings:

  - Added the required column `transaction` to the `Jet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jet" ADD COLUMN     "transaction" TEXT NOT NULL;
