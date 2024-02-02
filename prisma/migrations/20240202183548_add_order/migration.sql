/*
  Warnings:

  - Added the required column `order` to the `TabelaTemporaria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TabelaTemporaria` ADD COLUMN `order` INTEGER NOT NULL;
