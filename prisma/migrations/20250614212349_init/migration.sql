-- CreateTable
CREATE TABLE "HelicopterForCharterMessages" (
    "id" UUID NOT NULL,
    "customerName" VARCHAR(100) NOT NULL,
    "customerEmail" VARCHAR(255) NOT NULL,
    "customerCountry" VARCHAR(100),
    "departureLocation" VARCHAR(100) NOT NULL,
    "arrivalLocation" VARCHAR(100) NOT NULL,
    "departureDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3),
    "passengerCount" INTEGER NOT NULL,
    "specialRequests" TEXT,
    "listingId" UUID NOT NULL,
    "vendorId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "HelicopterForCharterMessages_pkey" PRIMARY KEY ("id")
);
