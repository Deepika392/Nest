/*
  Warnings:

  - You are about to drop the column `weather_data` on the `WeatherDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WeatherDetails" DROP COLUMN "weather_data",
ADD COLUMN     "data" JSONB;
