/*
  Warnings:

  - Added the required column `config` to the `GraphicItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `svg_one_hundred` to the `GraphicItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `svg_twenty` to the `GraphicItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `GraphicItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `GraphicItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GraphicItem` ADD COLUMN `config` TEXT NOT NULL,
    ADD COLUMN `svg_one_hundred` TEXT NOT NULL,
    ADD COLUMN `svg_twenty` TEXT NOT NULL,
    ADD COLUMN `type` ENUM('Vertext', 'Edge') NOT NULL DEFAULT 'Vertext',
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    ADD COLUMN `value` TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE `GraphicItem` ADD CONSTRAINT `GraphicItem_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
