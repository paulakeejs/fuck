/*
  Warnings:

  - You are about to drop the column `cabin_capacity` on the `Jet` table. All the data in the column will be lost.
  - You are about to drop the column `cabin_height` on the `Jet` table. All the data in the column will be lost.
  - You are about to drop the column `cabin_length` on the `Jet` table. All the data in the column will be lost.
  - You are about to drop the column `cabin_width` on the `Jet` table. All the data in the column will be lost.
  - You are about to drop the column `crew` on the `Jet` table. All the data in the column will be lost.
  - You are about to drop the column `engines` on the `Jet` table. All the data in the column will be lost.
  - You are about to drop the column `luggage_capacity` on the `Jet` table. All the data in the column will be lost.
  - You are about to drop the column `notable_features` on the `Jet` table. All the data in the column will be lost.
  - You are about to drop the column `paymentSignature` on the `Jet` table. All the data in the column will be lost.
  - You are about to drop the column `sellerType` on the `Jet` table. All the data in the column will be lost.
  - You are about to drop the column `vendorId` on the `Jet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Jet" DROP COLUMN "cabin_capacity",
DROP COLUMN "cabin_height",
DROP COLUMN "cabin_length",
DROP COLUMN "cabin_width",
DROP COLUMN "crew",
DROP COLUMN "engines",
DROP COLUMN "luggage_capacity",
DROP COLUMN "notable_features",
DROP COLUMN "paymentSignature",
DROP COLUMN "sellerType",
DROP COLUMN "vendorId",
ADD COLUMN     "airframe_engine_status" TEXT,
ADD COLUMN     "avionics_suite" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "cabin_amenities" TEXT,
ADD COLUMN     "contact_details" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "delivery_availability" TEXT,
ADD COLUMN     "empty_weight" DOUBLE PRECISION,
ADD COLUMN     "engine_hours" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "engine_make_model" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "lavatory_galley_details" TEXT,
ADD COLUMN     "maintenance_program" TEXT,
ADD COLUMN     "max_altitude" DOUBLE PRECISION,
ADD COLUMN     "payment_signature" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "previous_owners" INTEGER,
ADD COLUMN     "refurbishment_date" TEXT,
ADD COLUMN     "runway_length" DOUBLE PRECISION,
ADD COLUMN     "serialNumber" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "total_landings" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "vendor_id" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "wifi_connectivity" TEXT,
ALTER COLUMN "price" SET DATA TYPE TEXT,
ALTER COLUMN "take_off_weight" DROP NOT NULL;
