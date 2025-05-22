/*
  Warnings:

  - You are about to drop the column `exterior_images` on the `Jet` table. All the data in the column will be lost.
  - You are about to drop the column `interior_images` on the `Jet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Jet" DROP COLUMN "exterior_images",
DROP COLUMN "interior_images";
