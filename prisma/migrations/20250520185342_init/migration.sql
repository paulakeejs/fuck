/*
  Warnings:

  - The primary key for the `JetForCharter` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "JetForCharter" DROP CONSTRAINT "JetForCharter_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "JetForCharter_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "JetForCharter_id_seq";
