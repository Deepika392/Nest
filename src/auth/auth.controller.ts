import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
  import { AuthGuard } from '../guards/auth.guard';
  import { AuthService } from './auth.service';
  import { AuthenticateDto } from './dto/authenticate.dto';
  import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiTags('Auth')
  signIn(@Body() authenticateDto: AuthenticateDto) {
    return this.authService.signIn(authenticateDto.userName, authenticateDto.password);
  }
}