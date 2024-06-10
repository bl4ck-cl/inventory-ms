import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Provider } from './entities/provider.entity';
import { ProviderSchema } from './schemas/provider.schema';
import { Product, ProductSchema } from 'src/products/schema/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Provider.name, schema: ProviderSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProvidersController],
  providers: [ProvidersService],
})
export class ProvidersModule {}
