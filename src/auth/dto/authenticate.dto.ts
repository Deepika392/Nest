import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AuthenticateDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true})
    readonly userName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true})
    readonly password: string;
}