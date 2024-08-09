-- CreateTable
CREATE TABLE "WeatherDetailsList" (
    "id" SERIAL NOT NULL,
    "weather_details_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "WeatherDetailsList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WeatherDetailsList_weather_details_id_key" ON "WeatherDetailsList"("weather_details_id");

-- AddForeignKey
ALTER TABLE "WeatherDetailsList" ADD CONSTRAINT "WeatherDetailsList_weather_details_id_fkey" FOREIGN KEY ("weather_details_id") REFERENCES "WeatherDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
