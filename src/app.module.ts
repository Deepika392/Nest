import { Module,MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RequestLoggerMiddleware } from '../middleware/request-logger.middleware';
import {HttpModule} from '@nestjs/axios';
// import { Querybuilder } from 'nestjs-prisma-querybuilder';
// import { PrismaService } from './prisma/prisma.service';
// import { QuerybuilderService} from '.prisma/'

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',isGlobal: true,
  }), AuthModule, PrismaModule, UserModule,HttpModule,
    CacheModule.register({isGlobal: true,ttl:10800000}),
    ServeStaticModule.forRoot({
    rootPath: join(__dirname, '../..'),
  })],
  controllers: [AppController],
  // providers: [AppService,PrismaService,Querybuilder],
  providers: [AppService],
  // providers: [AppService],//correct
})
export class AppModule {
  // let's add a middleware on all routes
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
