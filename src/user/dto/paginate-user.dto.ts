
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class PaginateUserDto {
    @ApiProperty({ required: true})
    limit: string;

    @ApiProperty({ required: true })
    page: string;

    @ApiProperty({ required: true })
    skip: string;
  
}
