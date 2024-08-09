
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserDto {
    @ApiProperty({ required: true})
    email: string;

    @ApiProperty({ required: true })
    password: string;

    @ApiProperty({ required: true })
    phone: string;

    @ApiProperty({ required: true })
    address: string;

    @ApiProperty({ required: true })
    dob: Date;

    @ApiProperty({ required: true })
    profession: string;

    @ApiProperty({ required: true })
    firstname: string;

    @ApiProperty({ required: true })
    lastname: string;

    @ApiProperty({ required: true })
    role: Role;

}
