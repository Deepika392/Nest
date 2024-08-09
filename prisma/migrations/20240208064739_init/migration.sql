/*
  Warnings:

  - Changed the type of `city_population` on the `WeatherDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `city_timezone` on the `WeatherDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `city_sunrise` on the `WeatherDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `city_sunset` on the `WeatherDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "WeatherDetails" DROP COLUMN "city_population",
ADD COLUMN     "city_population" INTEGER NOT NULL,
DROP COLUMN "city_timezone",
ADD COLUMN     "city_timezone" INTEGER NOT NULL,
DROP COLUMN "city_sunrise",
ADD COLUMN     "city_sunrise" INTEGER NOT NULL,
DROP COLUMN "city_sunset",
ADD COLUMN     "city_sunset" INTEGER NOT NULL;
