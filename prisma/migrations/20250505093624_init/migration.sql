-- CreateTable
CREATE TABLE "Jet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "manufacturer" TEXT NOT NULL,
    "otherManufacturer" TEXT,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "flight_hours" INTEGER NOT NULL,
    "registration" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "cabin_config" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "take_off_weight" DOUBLE PRECISION NOT NULL,
    "sellerType" TEXT NOT NULL,
    "interior_images" TEXT[],
    "exterior_images" TEXT[],
    "vendor" TEXT NOT NULL,

    CONSTRAINT "Jet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Jet_registration_key" ON "Jet"("registration");
