-- AlterTable
ALTER TABLE "Jet" ADD COLUMN     "cabin_capacity" INTEGER,
ADD COLUMN     "cabin_height" DOUBLE PRECISION,
ADD COLUMN     "cabin_length" DOUBLE PRECISION,
ADD COLUMN     "cabin_width" DOUBLE PRECISION,
ADD COLUMN     "crew" TEXT,
ADD COLUMN     "cruise_speed" DOUBLE PRECISION,
ADD COLUMN     "engines" TEXT,
ADD COLUMN     "luggage_capacity" TEXT,
ADD COLUMN     "notable_features" TEXT,
ADD COLUMN     "range" DOUBLE PRECISION;
