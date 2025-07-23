/*
  Warnings:

  - Changed the type of `availableRoutes` on the `JetForCharter` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "JetForCharter" DROP COLUMN "availableRoutes",
ADD COLUMN     "availableRoutes" JSONB NOT NULL;
