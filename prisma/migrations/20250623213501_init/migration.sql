-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sponsored" BOOLEAN NOT NULL DEFAULT false;
