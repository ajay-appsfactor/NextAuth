/*
  Warnings:

  - You are about to alter the column `address_type` on the `vendor_addresses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `address_line1` on the `vendor_addresses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `address_line2` on the `vendor_addresses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `city` on the `vendor_addresses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `state_province` on the `vendor_addresses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `postal_code` on the `vendor_addresses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `country` on the `vendor_addresses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `name` on the `vendor_contacts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `job_title` on the `vendor_contacts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `email` on the `vendor_contacts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `phone_number` on the `vendor_contacts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `bank_name` on the `vendor_financials` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `bank_account_number` on the `vendor_financials` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `swift_iban_code` on the `vendor_financials` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `preferred_currency` on the `vendor_financials` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `payment_terms` on the `vendor_financials` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `tax_number` on the `vendor_financials` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `vat_number` on the `vendor_financials` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `key` on the `vendor_metadata` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `vendor_code` on the `vendors` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `vendor_name` on the `vendors` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `vendor_type` on the `vendors` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `email` on the `vendors` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `phone_number` on the `vendors` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `website` on the `vendors` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `status` on the `vendors` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "vendor_addresses" ALTER COLUMN "address_type" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "address_line1" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "address_line2" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "city" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "state_province" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "postal_code" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "country" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "vendor_contacts" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "job_title" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "phone_number" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "vendor_financials" ALTER COLUMN "bank_name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "bank_account_number" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "swift_iban_code" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "preferred_currency" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "payment_terms" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "tax_number" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "vat_number" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "vendor_metadata" ALTER COLUMN "key" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "vendors" ALTER COLUMN "vendor_code" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "vendor_name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "vendor_type" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "phone_number" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "website" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "status" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
