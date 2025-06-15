-- CreateTable
CREATE TABLE "helicopter_charters" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "model" VARCHAR(255) NOT NULL,
    "year" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "range" DOUBLE PRECISION NOT NULL,
    "pricePerHour" DOUBLE PRECISION NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "availableFrom" TIMESTAMP(3) NOT NULL,
    "availableTo" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "registrationNumber" VARCHAR(50) NOT NULL,
    "engineType" VARCHAR(50) NOT NULL,
    "engineCount" INTEGER NOT NULL,
    "maxSpeed" DOUBLE PRECISION NOT NULL,
    "cruisingSpeed" DOUBLE PRECISION NOT NULL,
    "fuelCapacity" DOUBLE PRECISION NOT NULL,
    "maxAltitude" DOUBLE PRECISION NOT NULL,
    "flightHours" DOUBLE PRECISION,
    "lastOverhaul" TIMESTAMP(3),
    "airworthinessCertificate" VARCHAR(100) NOT NULL,
    "lastMaintenanceDate" TIMESTAMP(3) NOT NULL,
    "insuranceStatus" VARCHAR(50) NOT NULL,
    "pilotQualifications" VARCHAR(100) NOT NULL,
    "safetyFeatures" TEXT[],
    "hasWifi" BOOLEAN NOT NULL DEFAULT false,
    "hasRefreshments" BOOLEAN NOT NULL DEFAULT false,
    "hasEntertainmentSystem" BOOLEAN NOT NULL DEFAULT false,
    "hasClimatControl" BOOLEAN NOT NULL DEFAULT false,
    "depositAmount" DOUBLE PRECISION NOT NULL,
    "minimumHours" DOUBLE PRECISION NOT NULL,
    "cancellationPolicy" VARCHAR(50) NOT NULL,
    "packageDeals" TEXT,
    "imageUrls" TEXT[],
    "transactionSignature" VARCHAR(255) NOT NULL,
    "transactionLink" VARCHAR(255),
    "vendorId" UUID NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    "views" INTEGER NOT NULL DEFAULT 0,
    "sponsored" BOOLEAN NOT NULL DEFAULT false,
    "sponsoredType" VARCHAR(50) NOT NULL DEFAULT 'NotSponsored',
    "end_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "helicopter_charters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "helicopter_charters_registrationNumber_key" ON "helicopter_charters"("registrationNumber");

-- CreateIndex
CREATE INDEX "helicopter_charters_vendorId_idx" ON "helicopter_charters"("vendorId");
