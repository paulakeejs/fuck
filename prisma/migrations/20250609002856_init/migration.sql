-- CreateTable
CREATE TABLE "helicopter_listings" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "helicopter_name" VARCHAR(255) NOT NULL,
    "helicopter_type" VARCHAR(100) NOT NULL,
    "manufacturer" VARCHAR(100) NOT NULL,
    "year_of_manufacture" INTEGER NOT NULL,
    "registration_number" VARCHAR(50) NOT NULL,
    "serial_number" VARCHAR(50) NOT NULL,
    "seating_capacity" INTEGER NOT NULL,
    "maximum_range" DOUBLE PRECISION NOT NULL,
    "cruising_speed" DOUBLE PRECISION NOT NULL,
    "baggage_capacity" VARCHAR(100) NOT NULL,
    "condition" VARCHAR(100) NOT NULL,
    "total_flight_hours" DOUBLE PRECISION NOT NULL,
    "maintenance_history" TEXT NOT NULL,
    "last_inspection" TIMESTAMP(3) NOT NULL,
    "sale_price" DOUBLE PRECISION NOT NULL,
    "discounts" TEXT,
    "avionics" TEXT,
    "emergency_equipment" BOOLEAN NOT NULL DEFAULT false,
    "cargo_hook" BOOLEAN NOT NULL DEFAULT false,
    "video_link" VARCHAR(255),
    "exterior_image_urls" TEXT[],
    "interior_image_urls" TEXT[],
    "additional_equipment" TEXT,
    "payment_tx_signature" VARCHAR(255) NOT NULL,
    "transaction_link" VARCHAR(255),
    "vendor_id" UUID NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "status" VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    "sponsored" BOOLEAN NOT NULL DEFAULT false,
    "sponsored_type" VARCHAR(50) NOT NULL DEFAULT 'NotSponsored',
    "end_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "helicopter_listings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cabin_features" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "cabin_features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "helicopter_messages" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer_name" VARCHAR(100) NOT NULL,
    "customer_email" VARCHAR(255) NOT NULL,
    "customer_country" VARCHAR(100),
    "listing_id" UUID NOT NULL,
    "vendor_id" UUID NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "helicopter_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HelicopterCabinFeatures" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_HelicopterCabinFeatures_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "helicopter_listings_registration_number_key" ON "helicopter_listings"("registration_number");

-- CreateIndex
CREATE UNIQUE INDEX "helicopter_listings_serial_number_key" ON "helicopter_listings"("serial_number");

-- CreateIndex
CREATE INDEX "helicopter_listings_vendor_id_idx" ON "helicopter_listings"("vendor_id");

-- CreateIndex
CREATE UNIQUE INDEX "cabin_features_name_key" ON "cabin_features"("name");

-- CreateIndex
CREATE INDEX "helicopter_messages_listing_id_idx" ON "helicopter_messages"("listing_id");

-- CreateIndex
CREATE INDEX "helicopter_messages_vendor_id_idx" ON "helicopter_messages"("vendor_id");

-- CreateIndex
CREATE INDEX "_HelicopterCabinFeatures_B_index" ON "_HelicopterCabinFeatures"("B");
