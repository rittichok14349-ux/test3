/*
  Warnings:

  - You are about to drop the `rooms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `requests` DROP FOREIGN KEY `requests_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `rooms` DROP FOREIGN KEY `rooms_dormId_fkey`;

-- DropTable
DROP TABLE `rooms`;

-- CreateTable
CREATE TABLE `Room` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomNo` VARCHAR(191) NOT NULL,
    `roomType` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `status` ENUM('AVAILABLE', 'RESERVED', 'FULL') NOT NULL DEFAULT 'AVAILABLE',
    `image` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `floor` INTEGER NOT NULL,
    `dormId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Room_roomNo_key`(`roomNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_dormId_fkey` FOREIGN KEY (`dormId`) REFERENCES `dorms`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requests` ADD CONSTRAINT `requests_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
