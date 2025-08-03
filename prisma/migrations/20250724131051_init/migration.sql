/*
  Warnings:

  - Made the column `checkInTime` on table `LuxuryDestination` required. This step will fail if there are existing NULL values in that column.
  - Made the column `checkOutTime` on table `LuxuryDestination` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quietHours` on table `LuxuryDestination` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "LuxuryDestination" ADD COLUMN     "imageDescriptions" JSONB,
ADD COLUMN     "imageSections" TEXT[] DEFAULT ARRAY['Rooms', 'Bathroom', 'Living area', 'Exterior', 'Common areas', 'Pool', 'Dining', 'Amenities', 'Views', 'What''s nearby', 'Family', 'Accessibility']::TEXT[],
ADD COLUMN     "mainImageUrl" TEXT,
ADD COLUMN     "otherImageUrls" TEXT[],
ADD COLUMN     "paymentMethods" TEXT[],
ADD COLUMN     "sectionImages" JSONB,
ALTER COLUMN "checkInTime" SET NOT NULL,
ALTER COLUMN "checkInTime" SET DEFAULT '15:00',
ALTER COLUMN "checkOutTime" SET NOT NULL,
ALTER COLUMN "checkOutTime" SET DEFAULT '11:00',
ALTER COLUMN "accessibleRooms" SET DATA TYPE TEXT,
ALTER COLUMN "quietHours" SET NOT NULL,
ALTER COLUMN "quietHours" SET DEFAULT '22:00 - 08:00',
ALTER COLUMN "vendorId" DROP DEFAULT;
