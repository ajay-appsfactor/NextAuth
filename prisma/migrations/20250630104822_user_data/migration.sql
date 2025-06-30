-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'customer', 'superadmin');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "user_key" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'customer',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_key")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_key_key" ON "User"("user_key");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
