/*
  Warnings:

  - Added the required column `published` to the `testimonials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "testimonials" ADD COLUMN     "published" BOOLEAN NOT NULL;
