-- AlterTable
ALTER TABLE "WeatherDetails" ALTER COLUMN "city_id" DROP NOT NULL,
ALTER COLUMN "city_name" DROP NOT NULL,
ALTER COLUMN "city_country" DROP NOT NULL,
ALTER COLUMN "city_population" DROP NOT NULL,
ALTER COLUMN "city_timezone" DROP NOT NULL,
ALTER COLUMN "city_sunrise" DROP NOT NULL,
ALTER COLUMN "city_sunset" DROP NOT NULL;
