import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { query } from 'express';
import { PaginateUserDto } from './dto/paginate-user.dto';
import { WeatherDetailsDto } from './dto/weather-details.dto';
import { CacheInterceptor,CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { UseInterceptors } from '@nestjs/common/decorators';
import { Request } from 'express';
import { PageDto } from './dto/page.dto';
import { PageOptionsDto } from './dto/page-options.dto'

@Controller('user')
@UseInterceptors(CacheInterceptor)
export class UserController {
constructor(private readonly userService: UserService ) {}

@UseGuards(AuthGuard,RolesGuard)
@Post()
@ApiTags('Users')
@Roles(Role.SUPERADMIN)
@ApiBearerAuth()
create(@Body() createUserDto: CreateUserDto) {
  return this.userService.create(createUserDto);
}

// @UseGuards(AuthGuard,RolesGuard)
// @Get()
// @ApiTags('Users')
// @Roles(Role.SUPERADMIN,Role.SUPPORT)
// @ApiBearerAuth()
// findAll() {
//   return this.userService.findAll();
// }



@UseGuards(AuthGuard,RolesGuard)
@Get()
@ApiTags('Users')
@Roles(Role.SUPERADMIN,Role.SUPPORT)
@ApiBearerAuth()
async findAll(
  @Query() pageOptionsDto: PageOptionsDto,
): Promise<PageDto<any>> {
  return this.userService.findAll(pageOptionsDto);
}


// @UseGuards(AuthGuard,RolesGuard)
// @Get()
// @ApiTags('Users')
// @Roles(Role.SUPERADMIN,Role.SUPPORT)
// @ApiBearerAuth()
// findAll(@Query() query: PaginateUserDto) {
//   return this.userService.findAll(query);
// }

@UseGuards(AuthGuard,RolesGuard)
@Get(':id')
@ApiTags('Users')
@Roles(Role.SUPERADMIN,Role.SUPPORT)
@ApiBearerAuth()
findOne(@Param('id') id: string) {
  return this.userService.findOne(+id);
}

@UseGuards(AuthGuard,RolesGuard)
@Patch(':id')
@ApiTags('Users')
@Roles(Role.SUPERADMIN,Role.SUPPORT)
@ApiBearerAuth()
update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  return this.userService.update(+id, updateUserDto);
}

@UseGuards(AuthGuard,RolesGuard)
@Delete(':id')
@ApiTags('Users')
@Roles(Role.SUPERADMIN)
@ApiBearerAuth()
remove(@Param('id') id: string) {
  return this.userService.remove(+id);
}


@UseGuards(AuthGuard,RolesGuard)
@Post('/fetch-weather-details')
@ApiTags('Users')
@Roles(Role.SUPERADMIN,Role.SUPPORT,Role.CUSTOMER,Role.TEAMMEMBER)
@ApiBearerAuth()
async fetchWeatherDetails(@Body() weatherDetailsDto: WeatherDetailsDto, @Req() req: Request) {      
  try{
    return  await this.userService.fetchWeatherDetails(weatherDetailsDto,req);
  } catch (error) {
    return error;
  }
}

@UseGuards(AuthGuard,RolesGuard)
@Post('/fetch-air-details')
@ApiTags('Users')
@Roles(Role.SUPERADMIN,Role.SUPPORT,Role.CUSTOMER,Role.TEAMMEMBER)
@ApiBearerAuth()
async fetchAirDetails(@Body() weatherDetailsDto: WeatherDetailsDto, @Req() req: Request) {      
  try{
    return  await this.userService.fetchAirDetails(weatherDetailsDto,req);
  } catch (error) {
    return error;
  }
}
}
