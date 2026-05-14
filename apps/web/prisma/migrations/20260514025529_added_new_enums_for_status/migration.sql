-- CreateEnum
CREATE TYPE "TestimonialStatus" AS ENUM ('REVIEW', 'APPROVED', 'REJECTED');

-- AlterEnum
ALTER TYPE "PostStatus" ADD VALUE 'REJECTED';
