import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { AddProductToProviderDto } from './dto/add-product.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-product')
  addProduct(@Body() { providerId, productId }: AddProductToProviderDto) {
    return this.providersService.addProduct(providerId, productId);
  }

  @Get()
  findAll() {
    return this.providersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.providersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(id);
  }
}
