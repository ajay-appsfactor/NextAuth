-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "user_key" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT,
    "company" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "country" TEXT,
    "phone" TEXT,
    "mobile" TEXT,
    "shipping_first_name" TEXT,
    "shipping_last_name" TEXT,
    "shipping_company" TEXT,
    "shipping_address" TEXT,
    "shipping_city" TEXT,
    "shipping_state" TEXT,
    "shipping_zip" TEXT,
    "shipping_country" TEXT,
    "shipping_phone" TEXT,
    "shipping_mobile" TEXT,
    "send_invoice" TEXT,
    "conformance" TEXT,
    "terms" TEXT,
    "freight" TEXT,
    "customer_note" VARCHAR(250),
    "quality_note" VARCHAR(250),
    "accounting_note" VARCHAR(250),
    "shipping_note" VARCHAR(250),
    "sales_note" VARCHAR(250),
    "about" VARCHAR(250),
    "gender" TEXT DEFAULT 'UNKNOWN',
    "sorting" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_user_key_fkey" FOREIGN KEY ("user_key") REFERENCES "User"("user_key") ON DELETE RESTRICT ON UPDATE CASCADE;
