/*
  Warnings:

  - The primary key for the `WeatherDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id,user_id,lat,long]` on the table `WeatherDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "WeatherDetails" DROP CONSTRAINT "WeatherDetails_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "WeatherDetails_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "WeatherDetails_id_user_id_lat_long_key" ON "WeatherDetails"("id", "user_id", "lat", "long");
