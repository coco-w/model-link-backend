-- AlterTable
ALTER TABLE `GraphicItem` ADD COLUMN `viewItemId` VARCHAR(191) NULL,
    MODIFY `structure` VARCHAR(191) NULL,
    MODIFY `value` TEXT NULL;

-- CreateTable
CREATE TABLE `FormEntity` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `judgment` BOOLEAN NULL,
    `remark` VARCHAR(191) NULL,
    `config` TEXT NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ViewItem` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `remark` VARCHAR(191) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `formId` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ViewItemAndGraphicItem` (
    `viewItemId` VARCHAR(191) NOT NULL,
    `graphicItemId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`viewItemId`, `graphicItemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GraphicItem` ADD CONSTRAINT `GraphicItem_viewItemId_fkey` FOREIGN KEY (`viewItemId`) REFERENCES `ViewItem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FormEntity` ADD CONSTRAINT `FormEntity_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ViewItem` ADD CONSTRAINT `ViewItem_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `FormEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ViewItem` ADD CONSTRAINT `ViewItem_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ViewItemAndGraphicItem` ADD CONSTRAINT `ViewItemAndGraphicItem_viewItemId_fkey` FOREIGN KEY (`viewItemId`) REFERENCES `ViewItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ViewItemAndGraphicItem` ADD CONSTRAINT `ViewItemAndGraphicItem_graphicItemId_fkey` FOREIGN KEY (`graphicItemId`) REFERENCES `GraphicItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
