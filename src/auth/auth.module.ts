import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {HttpModule} from '@nestjs/axios';
import { Querybuilder } from 'nestjs-prisma-querybuilder';
@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync(jwtConstants),
    HttpModule
  ],
  providers: [AuthService,UserService,PrismaService,Querybuilder],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}