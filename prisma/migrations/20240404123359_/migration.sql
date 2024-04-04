/*
  Warnings:

  - You are about to alter the column `type` on the `GraphicItem` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `GraphicItem` MODIFY `type` ENUM('vertex', 'edge') NOT NULL DEFAULT 'vertex';

-- CreateIndex
CREATE UNIQUE INDEX `User_name_key` ON `User`(`name`);
