/*
  Warnings:

  - You are about to drop the column `svg_one_hundred` on the `GraphicItem` table. All the data in the column will be lost.
  - You are about to drop the column `svg_twenty` on the `GraphicItem` table. All the data in the column will be lost.
  - Added the required column `svgOneHundred` to the `GraphicItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `svgTwenty` to the `GraphicItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GraphicItem` DROP COLUMN `svg_one_hundred`,
    DROP COLUMN `svg_twenty`,
    ADD COLUMN `svgOneHundred` TEXT NOT NULL,
    ADD COLUMN `svgTwenty` TEXT NOT NULL;
