/*
  Warnings:

  - You are about to drop the column `exteriorImageUrls` on the `Jet` table. All the data in the column will be lost.
  - You are about to drop the column `interiorImageUrls` on the `Jet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Jet" DROP COLUMN "exteriorImageUrls",
DROP COLUMN "interiorImageUrls",
ADD COLUMN     "exterior_image_urls" TEXT[],
ADD COLUMN     "interior_image_urls" TEXT[];
