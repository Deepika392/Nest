/*
  Warnings:

  - You are about to drop the column `data` on the `WeatherDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WeatherDetails" DROP COLUMN "data",
ADD COLUMN     "air_data" JSONB,
ADD COLUMN     "weather_data" JSONB;
