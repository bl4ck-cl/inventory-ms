import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersProfilesService } from './users-profiles.service';
import { CreateUsersProfileDto } from './dto/create-users-profile.dto';
import { UpdateUsersProfileDto } from './dto/update-users-profile.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('users-profiles')
export class UsersProfilesController {
  constructor(private readonly usersProfilesService: UsersProfilesService) {}

  @Post()
  create(@Body() createUsersProfileDto: CreateUsersProfileDto) {
    return this.usersProfilesService.create(createUsersProfileDto);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersProfilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersProfilesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersProfileDto: UpdateUsersProfileDto) {
    return this.usersProfilesService.update(+id, updateUsersProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersProfilesService.remove(+id);
  }
}
