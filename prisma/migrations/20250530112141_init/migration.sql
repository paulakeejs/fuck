/*
  Warnings:

  - You are about to drop the column `endData` on the `JetForCharter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JetForCharter" DROP COLUMN "endData",
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
