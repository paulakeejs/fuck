/*
  Warnings:

  - You are about to drop the column `end_date` on the `Jet` table. All the data in the column will be lost.
  - You are about to drop the column `range` on the `Jet` table. All the data in the column will be lost.
  - Added the required column `description` to the `Jet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Jet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jet" DROP COLUMN "end_date",
DROP COLUMN "range",
ADD COLUMN     "avionics_updates" TEXT,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "exterior_paint_scheme" TEXT,
ADD COLUMN     "featured_until" TIMESTAMP(3),
ADD COLUMN     "fuel_capacity" DOUBLE PRECISION,
ADD COLUMN     "fuel_consumption" DOUBLE PRECISION,
ADD COLUMN     "interior_designer" TEXT,
ADD COLUMN     "landing_distance" DOUBLE PRECISION,
ADD COLUMN     "operational_restrictions" TEXT,
ADD COLUMN     "range_nm" DOUBLE PRECISION,
ADD COLUMN     "recent_upgrades" TEXT,
ADD COLUMN     "service_ceiling" DOUBLE PRECISION,
ADD COLUMN     "takeoff_distance" DOUBLE PRECISION,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "warranty_remaining" TEXT,
ALTER COLUMN "engine_hours" SET DATA TYPE DOUBLE PRECISION;

-- CreateIndex
CREATE INDEX "Jet_manufacturer_idx" ON "Jet"("manufacturer");

-- CreateIndex
CREATE INDEX "Jet_model_idx" ON "Jet"("model");

-- CreateIndex
CREATE INDEX "Jet_year_idx" ON "Jet"("year");

-- CreateIndex
CREATE INDEX "Jet_price_idx" ON "Jet"("price");

-- CreateIndex
CREATE INDEX "Jet_status_idx" ON "Jet"("status");

-- CreateIndex
CREATE INDEX "Jet_vendor_id_idx" ON "Jet"("vendor_id");
