import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import {HttpModule} from '@nestjs/axios';
import { Querybuilder } from 'nestjs-prisma-querybuilder';
// import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [UserController],
  providers: [UserService,Querybuilder],
  imports: [PrismaModule,JwtModule.registerAsync(jwtConstants),HttpModule]
})
export class UserModule {}
