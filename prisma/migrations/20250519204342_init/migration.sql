/*
  Warnings:

  - Added the required column `aircraft_type` to the `Jet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baggage_capacity` to the `Jet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cabin_height` to the `Jet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cabin_length` to the `Jet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cabin_width` to the `Jet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `engine_thrust` to the `Jet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `engine_type` to the `Jet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_inspection_date` to the `Jet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maintenance_status` to the `Jet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `next_inspection_due` to the `Jet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noise_compliance` to the `Jet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_of_engines` to the `Jet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seating_capacity` to the `Jet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jet" ADD COLUMN     "aircraft_type" TEXT NOT NULL,
ADD COLUMN     "baggage_capacity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "cabin_height" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "cabin_length" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "cabin_width" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "certification" TEXT NOT NULL DEFAULT 'FAA',
ADD COLUMN     "engine_thrust" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "engine_type" TEXT NOT NULL,
ADD COLUMN     "last_inspection_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "maintenance_status" TEXT NOT NULL,
ADD COLUMN     "next_inspection_due" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "noise_compliance" TEXT NOT NULL,
ADD COLUMN     "number_of_engines" INTEGER NOT NULL,
ADD COLUMN     "seating_capacity" INTEGER NOT NULL;
