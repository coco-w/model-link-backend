/*
  Warnings:

  - You are about to drop the column `viewItemId` on the `GraphicItem` table. All the data in the column will be lost.
  - You are about to drop the column `formId` on the `ViewItem` table. All the data in the column will be lost.
  - You are about to alter the column `type` on the `ViewItem` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to drop the `ViewItemAndGraphicItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `GraphicItem` DROP FOREIGN KEY `GraphicItem_viewItemId_fkey`;

-- DropForeignKey
ALTER TABLE `ViewItem` DROP FOREIGN KEY `ViewItem_formId_fkey`;

-- DropForeignKey
ALTER TABLE `ViewItemAndGraphicItem` DROP FOREIGN KEY `ViewItemAndGraphicItem_graphicItemId_fkey`;

-- DropForeignKey
ALTER TABLE `ViewItemAndGraphicItem` DROP FOREIGN KEY `ViewItemAndGraphicItem_viewItemId_fkey`;

-- AlterTable
ALTER TABLE `FormEntity` MODIFY `config` TEXT NULL;

-- AlterTable
ALTER TABLE `GraphicItem` DROP COLUMN `viewItemId`;

-- AlterTable
ALTER TABLE `ViewItem` DROP COLUMN `formId`,
    MODIFY `type` ENUM('graph', 'form', 'gantt', 'matrix', 'matrixInput', 'interactiveMatrix', 'measurement', 'sourceModelTable', 'sourceTaskView', 'conceptual', 'richTextEditor', 'constraintView') NOT NULL DEFAULT 'graph';

-- DropTable
DROP TABLE `ViewItemAndGraphicItem`;

-- CreateTable
CREATE TABLE `_GraphicItemToViewItem` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_GraphicItemToViewItem_AB_unique`(`A`, `B`),
    INDEX `_GraphicItemToViewItem_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FormEntityToViewItem` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_FormEntityToViewItem_AB_unique`(`A`, `B`),
    INDEX `_FormEntityToViewItem_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_GraphicItemToViewItem` ADD CONSTRAINT `_GraphicItemToViewItem_A_fkey` FOREIGN KEY (`A`) REFERENCES `GraphicItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GraphicItemToViewItem` ADD CONSTRAINT `_GraphicItemToViewItem_B_fkey` FOREIGN KEY (`B`) REFERENCES `ViewItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FormEntityToViewItem` ADD CONSTRAINT `_FormEntityToViewItem_A_fkey` FOREIGN KEY (`A`) REFERENCES `FormEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FormEntityToViewItem` ADD CONSTRAINT `_FormEntityToViewItem_B_fkey` FOREIGN KEY (`B`) REFERENCES `ViewItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
