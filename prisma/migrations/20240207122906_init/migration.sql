/*
  Warnings:

  - You are about to drop the `WeatherDetailsList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WeatherDetailsList" DROP CONSTRAINT "WeatherDetailsList_weather_details_id_fkey";

-- AlterTable
ALTER TABLE "WeatherDetails" ADD COLUMN     "data" JSONB;

-- DropTable
DROP TABLE "WeatherDetailsList";
