-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMINISTRATOR', 'GUEST');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'GUEST';

-- CreateTable
CREATE TABLE "Testimonials" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT,
    "content" TEXT NOT NULL,
    "avatar" TEXT,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "is_approve" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestimonialFeedback" (
    "id" TEXT NOT NULL,
    "my_feedback" TEXT NOT NULL,
    "testimonial_id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestimonialFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Testimonials_userId_idx" ON "Testimonials"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TestimonialFeedback_testimonial_id_key" ON "TestimonialFeedback"("testimonial_id");

-- AddForeignKey
ALTER TABLE "Testimonials" ADD CONSTRAINT "Testimonials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestimonialFeedback" ADD CONSTRAINT "TestimonialFeedback_testimonial_id_fkey" FOREIGN KEY ("testimonial_id") REFERENCES "Testimonials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestimonialFeedback" ADD CONSTRAINT "TestimonialFeedback_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
