/*
  Warnings:

  - The primary key for the `WeatherDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `WeatherDetails` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "WeatherDetails_user_id_lat_long_key";

-- AlterTable
ALTER TABLE "WeatherDetails" DROP CONSTRAINT "WeatherDetails_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "WeatherDetails_pkey" PRIMARY KEY ("user_id", "lat", "long");
