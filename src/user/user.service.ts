import { Inject,Injectable,BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { encodePassword } from 'src/utils/bcrypt';
import { Controller, Get, Query } from "@nestjs/common";
import { query } from 'express';
import { PaginateUserDto } from './dto/paginate-user.dto';
import { WeatherDetailsDto } from './dto/weather-details.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'; 
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import {HttpService} from '@nestjs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { User } from '@prisma/client';
import { catchError, firstValueFrom } from 'rxjs';
//import { PageDto,PageMetaDto, PageOptionsDto } from './dto/page.dto';
import { PageDto } from './dto/page.dto';
import { PageMetaDto } from './dto/page-meta.dto';
import { PageOptionsDto } from './dto/page-options.dto';

import { Prisma } from '@prisma/client';
import { Querybuilder } from 'nestjs-prisma-querybuilder';
// import { User } from './entities/user.entity';
// import { InjectRepository } from '@nestjs/typeorm';

// import { PaginatedResult, PaginateFunction, paginator } from '@providers/prisma/paginator';


@Injectable()
export class UserService {
  user: any;
constructor(private prisma: PrismaService,
          @Inject(CACHE_MANAGER) private cacheManager: Cache,
          @Inject(REQUEST) private readonly request: Request,
          private readonly httpService: HttpService,
          private readonly querybuilder: Querybuilder,
          ) {}

async create(createUserDto: CreateUserDto) {
  const password = await encodePassword(createUserDto.password);
  createUserDto.password = password;
  return this.prisma.user.create({ data: createUserDto });
}


// findAll() {
//   return this.prisma.user.findMany();
// }


 async findAll(
  pageOptionsDto: PageOptionsDto,
): Promise<PageDto<any>> {
  const queryBuilder =  await this.user.createQueryBuilder("User");

  queryBuilder
    .orderBy("user.createdAt", pageOptionsDto.order)
    .skip(pageOptionsDto.skip)
    .take(pageOptionsDto.take);

  const itemCount = await queryBuilder.getCount();
  const { entities } = await queryBuilder.getRawAndEntities();

  const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

  return new PageDto(entities, pageMetaDto);
}

findOne(id: number) {
  return this.prisma.user.findUnique({ where: { id } });
}

findUser(email: string) {
  return this.prisma.user.findUnique({ where: { email } });
}

async update(id: number, updateUserDto: UpdateUserDto) {
  const password = await encodePassword(updateUserDto.password);
  updateUserDto.password = password;
  return this.prisma.user.update({
    where: { id },
    data: updateUserDto,
  });
}

remove(id: number) {
  return this.prisma.user.delete({ where: { id } });
}

async fetchWeatherDetails(weatherDetailsDto:WeatherDetailsDto,req): Promise<any> {
const userId = req.user.sub;
let  value  = 'weather_'+weatherDetailsDto.lat+'_' + weatherDetailsDto.long +'_'+ userId;

//get key from cache
let cacheVal = await this.getData(value);

//set key in cache
if(cacheVal == undefined)
{
    //external service
    const { data } = await firstValueFrom(
      this.httpService.get<any>('https://api.openweathermap.org/data/2.5/forecast?lat='+weatherDetailsDto.lat+'&lon='+weatherDetailsDto.long+'&appid='+ process.env.APP_ID+'').pipe(
        catchError((error: AxiosError) => {
          throw  error 
        }),
      ),
    );
    
    //check DB
    const res =  await this.prisma.weatherDetails.findFirst({ where: {user_id: userId,lat:weatherDetailsDto.lat,long: weatherDetailsDto.long} });
    // const res =  await this.prisma.weatherDetails.findFirst({ where: {user_id: userId} });
    if(res)
    {//update
      await this.prisma.weatherDetails.update({
          where: {  id: res.id }, 
          data: {
            city_id           : data && data.city &&  data.city.id ? data.city.id : '',
            city_name         : data && data.city &&  data.city.name ? data.city.name : '',
            city_country      : data && data.city &&  data.city.country ? data.city.country : '',
            city_population   : data && data.city &&  data.city.population ? data.city.population : '',
            city_timezone     : data && data.city &&  data.city.timezone ? data.city.timezone : '',
            city_sunrise      : data && data.city &&  data.city.sunrise ? data.city.sunrise : '',
            city_sunset       : data && data.city &&  data.city.sunset ? data.city.sunset : '',
            weather_data      : data
          }
      });
      
    }else{
      //insert
        await this.prisma.weatherDetails.create({
          data: {
            user:{connect:{id:userId } },
            lat               : weatherDetailsDto.lat,
            long              : weatherDetailsDto.long,
            city_id           : data && data.city &&  data.city.id ? data.city.id : '',
            city_name         : data && data.city &&  data.city.name ? data.city.name : '',
            city_country      : data && data.city &&  data.city.country ? data.city.country : '',
            city_population   : data && data.city &&  data.city.population ? data.city.population : '',
            city_timezone     : data && data.city &&  data.city.timezone ? data.city.timezone : '',
            city_sunrise      : data && data.city &&  data.city.sunrise ? data.city.sunrise : '',
            city_sunset       : data && data.city &&  data.city.sunset ? data.city.sunset : '',
            weather_data      : data
          }
        }); 
    }
  
    //set cache
    await this.cacheManager.set(value, 'weatherkey');

    return data;
  
}else{
  
  const res =  await this.prisma.weatherDetails.findFirst({ where: {user_id: userId,lat:weatherDetailsDto.lat,long: weatherDetailsDto.long} });
  return  res.weather_data
  
}
}

//Retrieve data from the cache
async getData(value): Promise<string | undefined> {
return await this.cacheManager.get<string>(value); 

}

async fetchAirDetails(weatherDetailsDto:WeatherDetailsDto,req): Promise<any> {
const userId = req.user.sub;
let  value  = 'air_'+weatherDetailsDto.lat+'_' + weatherDetailsDto.long +'_'+ userId;

//get key from cache
let cacheVal = await this.getData(value);

//set key in cache
if(cacheVal == undefined)
{
    //external service
    let { data } = await firstValueFrom(
      this.httpService.get<any>('http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat='+weatherDetailsDto.lat+'&lon='+weatherDetailsDto.long+'&appid='+ process.env.APP_ID+'').pipe(
        catchError((error: AxiosError) => {
          throw error
        }),
      ),
    );
    //check DB
    const res =  await this.prisma.weatherDetails.findFirst({ where: {user_id: userId,lat:weatherDetailsDto.lat,long: weatherDetailsDto.long} });
    if(res)
    {//update
        await this.prisma.weatherDetails.update({
          where: {  id: res.id },
          data: {
            air_data  : data
            
          }
      });
    
    }else{
      //insert
        await this.prisma.weatherDetails.create({
          data: {
            user:{connect:{id:userId } },
            lat      : weatherDetailsDto.lat,
            long     : weatherDetailsDto.long,
            air_data : data
          }
        }); 
    }
  
    //set cache
    await this.cacheManager.set(value, 'airkey');
    return data;
  
}else{
  
  const res =  await this.prisma.weatherDetails.findFirst({ where: {user_id: userId,lat:weatherDetailsDto.lat,long: weatherDetailsDto.long} });
  return  res.air_data
  
}
}

}

