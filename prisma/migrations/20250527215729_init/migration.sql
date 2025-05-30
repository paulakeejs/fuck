-- CreateTable
CREATE TABLE "JetForCharterMessages" (
    "id" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerCountry" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "dateRange" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "JetForCharterMessages_pkey" PRIMARY KEY ("id")
);
