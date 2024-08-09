/*
  Warnings:

  - A unique constraint covering the columns `[user_id,lat,long]` on the table `WeatherDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WeatherDetails_user_id_lat_long_key" ON "WeatherDetails"("user_id", "lat", "long");
