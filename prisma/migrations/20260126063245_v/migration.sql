/*
  Warnings:

  - You are about to drop the `bills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contracts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `maintenance_requests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `meters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tenants` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dormId` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bills` DROP FOREIGN KEY `bills_contract_id_fkey`;

-- DropForeignKey
ALTER TABLE `contracts` DROP FOREIGN KEY `contracts_room_id_fkey`;

-- DropForeignKey
ALTER TABLE `contracts` DROP FOREIGN KEY `contracts_tenant_id_fkey`;

-- DropForeignKey
ALTER TABLE `contracts` DROP FOREIGN KEY `contracts_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `logs` DROP FOREIGN KEY `logs_userId_fkey`;

-- DropForeignKey
ALTER TABLE `maintenance_requests` DROP FOREIGN KEY `maintenance_requests_room_id_fkey`;

-- DropForeignKey
ALTER TABLE `maintenance_requests` DROP FOREIGN KEY `maintenance_requests_tenant_id_fkey`;

-- DropForeignKey
ALTER TABLE `meters` DROP FOREIGN KEY `meters_room_id_fkey`;

-- AlterTable
ALTER TABLE `rooms` ADD COLUMN `dormId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `bills`;

-- DropTable
DROP TABLE `contracts`;

-- DropTable
DROP TABLE `logs`;

-- DropTable
DROP TABLE `maintenance_requests`;

-- DropTable
DROP TABLE `meters`;

-- DropTable
DROP TABLE `orders`;

-- DropTable
DROP TABLE `products`;

-- DropTable
DROP TABLE `tenants`;

-- CreateTable
CREATE TABLE `requests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `userId` INTEGER NULL,
    `roomId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dorms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `address` TEXT NULL,
    `phone` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_code` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `faculty` VARCHAR(191) NULL,
    `major` VARCHAR(191) NULL,
    `year` INTEGER NULL,
    `address` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `students_student_code_key`(`student_code`),
    UNIQUE INDEX `students_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_dormId_fkey` FOREIGN KEY (`dormId`) REFERENCES `dorms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requests` ADD CONSTRAINT `requests_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requests` ADD CONSTRAINT `requests_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `rooms`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
