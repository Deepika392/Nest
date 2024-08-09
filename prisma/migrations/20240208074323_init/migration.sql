/*
  Warnings:

  - Added the required column `createDate` to the `WeatherDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WeatherDetails" ADD COLUMN     "createDate" DATE NOT NULL;
