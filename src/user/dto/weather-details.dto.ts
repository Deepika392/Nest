
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class WeatherDetailsDto {
    @ApiProperty({ required: true})
    lat: string;

    @ApiProperty({ required: true })
    long: string;

}
