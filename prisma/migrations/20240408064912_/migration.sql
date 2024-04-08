/*
  Warnings:

  - You are about to drop the column `sourceModelId` on the `SourceModelTag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `SourceModelTag` DROP FOREIGN KEY `SourceModelTag_sourceModelId_fkey`;

-- AlterTable
ALTER TABLE `SourceModelTag` DROP COLUMN `sourceModelId`;

-- CreateTable
CREATE TABLE `_SourceModelToSourceModelTag` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_SourceModelToSourceModelTag_AB_unique`(`A`, `B`),
    INDEX `_SourceModelToSourceModelTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_SourceModelToSourceModelTag` ADD CONSTRAINT `_SourceModelToSourceModelTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `SourceModel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SourceModelToSourceModelTag` ADD CONSTRAINT `_SourceModelToSourceModelTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `SourceModelTag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
