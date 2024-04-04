/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - The required column `asdasd` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `GraphicItem` DROP FOREIGN KEY `GraphicItem_userId_fkey`;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `asdasd` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`asdasd`);

-- AddForeignKey
ALTER TABLE `GraphicItem` ADD CONSTRAINT `GraphicItem_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`asdasd`) ON DELETE RESTRICT ON UPDATE CASCADE;
