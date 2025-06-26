-- CreateTable
CREATE TABLE "CarBookings" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,

    CONSTRAINT "CarBookings_pkey" PRIMARY KEY ("id")
);
