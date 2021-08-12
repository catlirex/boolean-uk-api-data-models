/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Guest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Guest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guest" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Guest.email_unique" ON "Guest"("email");
