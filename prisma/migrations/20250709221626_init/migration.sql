-- AlterTable
ALTER TABLE "Jet" ALTER COLUMN "payment_tx_signature" DROP NOT NULL,
ALTER COLUMN "payment_tx_signature" SET DEFAULT 'Signature';
