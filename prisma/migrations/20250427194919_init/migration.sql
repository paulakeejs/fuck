-- AlterTable
ALTER TABLE "User" ADD COLUMN     "vendor" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "admin" SET DEFAULT false;
