/*
  Warnings:

  - The primary key for the `_HelicopterCabinFeatures` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `cabin_features` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `helicopter_listings` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "CarType" AS ENUM ('SEDAN', 'SUV', 'COUPE', 'CONVERTIBLE', 'SPORTS_CAR', 'SUPERCAR', 'HYPERCAR', 'WAGON', 'LIMOUSINE');

-- CreateEnum
CREATE TYPE "Transmission" AS ENUM ('AUTOMATIC', 'MANUAL', 'SEMI_AUTOMATIC', 'CVT');

-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID', 'PLUG_IN_HYBRID', 'HYDROGEN');

-- CreateEnum
CREATE TYPE "DriveType" AS ENUM ('REAR_WHEEL_DRIVE', 'FRONT_WHEEL_DRIVE', 'ALL_WHEEL_DRIVE', 'FOUR_WHEEL_DRIVE');

-- CreateEnum
CREATE TYPE "ConditionLevel" AS ENUM ('BRAND_NEW', 'LIKE_NEW', 'EXCELLENT', 'GOOD', 'FAIR');

-- CreateEnum
CREATE TYPE "DeliveryOption" AS ENUM ('NONE', 'LOCAL', 'AIRPORT', 'CUSTOM');

-- AlterTable
ALTER TABLE "_HelicopterCabinFeatures" DROP CONSTRAINT "_HelicopterCabinFeatures_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_HelicopterCabinFeatures_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "cabin_features" DROP CONSTRAINT "cabin_features_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ADD CONSTRAINT "cabin_features_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "helicopter_listings" DROP CONSTRAINT "helicopter_listings_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "helicopter_listings_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "carType" "CarType" NOT NULL,
    "color" TEXT NOT NULL,
    "interiorColor" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "doors" INTEGER,
    "transmission" "Transmission" NOT NULL,
    "driveType" "DriveType" NOT NULL,
    "fuel" "FuelType" NOT NULL,
    "condition" "ConditionLevel",
    "price" DOUBLE PRECISION NOT NULL,
    "weeklyDiscount" DOUBLE PRECISION,
    "monthlyDiscount" DOUBLE PRECISION,
    "deposit" DOUBLE PRECISION,
    "vin" TEXT,
    "licensePlate" TEXT,
    "deliveryOption" "DeliveryOption",
    "insuranceInfo" TEXT,
    "rentalTerms" TEXT,
    "description" TEXT NOT NULL,
    "features" TEXT[],
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "mileage" INTEGER,
    "engineSize" TEXT,
    "horsepower" INTEGER,
    "acceleration" DOUBLE PRECISION,
    "topSpeed" INTEGER,
    "images" TEXT[],
    "location" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);
