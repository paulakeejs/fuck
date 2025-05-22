-- CreateTable
CREATE TABLE "JetForSaleMessages" (
    "id" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerCountry" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,

    CONSTRAINT "JetForSaleMessages_pkey" PRIMARY KEY ("id")
);
