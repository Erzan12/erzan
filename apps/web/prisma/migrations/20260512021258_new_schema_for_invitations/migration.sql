/*
  Warnings:

  - You are about to drop the column `is_approve` on the `Testimonials` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[invitation_id]` on the table `Testimonials` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'EXPIRED', 'DECLINED');

-- AlterTable
ALTER TABLE "Testimonials" DROP COLUMN "is_approve",
ADD COLUMN     "invitation_id" TEXT,
ADD COLUMN     "is_approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "submitted_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "TestimonialInvitation" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "status" "InvitationStatus" NOT NULL DEFAULT 'PENDING',
    "expires_at" TIMESTAMP(3) NOT NULL,
    "accepted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "invited_by_id" TEXT NOT NULL,

    CONSTRAINT "TestimonialInvitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TestimonialInvitation_token_key" ON "TestimonialInvitation"("token");

-- CreateIndex
CREATE INDEX "TestimonialInvitation_email_idx" ON "TestimonialInvitation"("email");

-- CreateIndex
CREATE INDEX "TestimonialInvitation_status_idx" ON "TestimonialInvitation"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Testimonials_invitation_id_key" ON "Testimonials"("invitation_id");

-- AddForeignKey
ALTER TABLE "TestimonialInvitation" ADD CONSTRAINT "TestimonialInvitation_invited_by_id_fkey" FOREIGN KEY ("invited_by_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonials" ADD CONSTRAINT "Testimonials_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "TestimonialInvitation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
