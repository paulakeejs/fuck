/*
  Warnings:

  - You are about to drop the column `cabin_config` on the `Jet` table. All the data in the column will be lost.
  - You are about to drop the column `flight_hours` on the `Jet` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Jet` table. All the data in the column will be lost.
  - You are about to drop the column `payment_signature` on the `Jet` table. All the data in the column will be lost.
  - You are about to drop the column `registration` on the `Jet` table. All the data in the column will be lost.
  - You are about to drop the column `take_off_weight` on the `Jet` table. All the data in the column will be lost.
  - You are about to drop the column `transaction` on the `Jet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[registration_number]` on the table `Jet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `current_location` to the `Jet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interior_config` to the `Jet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_tx_signature` to the `Jet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registration_number` to the `Jet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_time_since_new` to the `Jet` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Jet_registration_key";

-- AlterTable
ALTER TABLE "Jet" DROP COLUMN "cabin_config",
DROP COLUMN "flight_hours",
DROP COLUMN "location",
DROP COLUMN "payment_signature",
DROP COLUMN "registration",
DROP COLUMN "take_off_weight",
DROP COLUMN "transaction",
ADD COLUMN     "current_location" TEXT NOT NULL,
ADD COLUMN     "interior_config" TEXT NOT NULL,
ADD COLUMN     "max_takeoff_weight" DOUBLE PRECISION,
ADD COLUMN     "payment_tx_signature" TEXT NOT NULL,
ADD COLUMN     "registration_number" TEXT NOT NULL,
ADD COLUMN     "total_time_since_new" INTEGER NOT NULL,
ADD COLUMN     "transaction_link" TEXT,
ALTER COLUMN "avionics_suite" DROP DEFAULT,
ALTER COLUMN "contact_details" DROP DEFAULT,
ALTER COLUMN "engine_hours" DROP DEFAULT,
ALTER COLUMN "engine_make_model" DROP DEFAULT,
ALTER COLUMN "serialNumber" DROP DEFAULT,
ALTER COLUMN "total_landings" DROP DEFAULT,
ALTER COLUMN "vendor_id" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Jet_registration_number_key" ON "Jet"("registration_number");
