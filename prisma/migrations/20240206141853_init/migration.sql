-- CreateTable
CREATE TABLE "WeatherDetails" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "lat" TEXT NOT NULL,
    "long" TEXT NOT NULL,
    "city_id" INTEGER NOT NULL,
    "city_name" TEXT NOT NULL,
    "city_country" TEXT NOT NULL,
    "city_population" TEXT NOT NULL,
    "city_timezone" TEXT NOT NULL,
    "city_sunrise" TEXT NOT NULL,
    "city_sunset" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeatherDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WeatherDetails_user_id_key" ON "WeatherDetails"("user_id");

-- AddForeignKey
ALTER TABLE "WeatherDetails" ADD CONSTRAINT "WeatherDetails_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
