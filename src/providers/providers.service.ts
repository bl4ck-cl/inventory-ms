import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Provider } from './schemas/provider.schema';
import { Model } from 'mongoose';
import { ProviderAlreadyExistsException } from 'src/common/exceptions/provider-already-exist';
import { Product } from 'src/products/schema/product.schema';
import { ProviderAlreadyHasProduct } from 'src/common/exceptions/provider-has-product';

@Injectable()
export class ProvidersService {
  constructor(@InjectModel(Provider.name) private readonly providerModel: Model<Provider>, @InjectModel(Product.name) private readonly productModel: Model<Product>){};

  async create(createProviderDto: CreateProviderDto) {

    const existingProvider = await this.providerModel.findOne({name: CreateProviderDto.name}).exec();
    if(existingProvider) {
      throw new ProviderAlreadyExistsException();
     }
 
     const newProvider = new this.providerModel(createProviderDto);
     return newProvider.save();
  }

  async findAll() {
    return await this.providerModel.find().exec();
  }

  async findOne(id: string) {
    const provider = await this.providerModel.findById(id).exec();
    return provider ? provider.toObject() : null;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto): Promise<Provider | null> {
    const updatedProvider = await this.providerModel.findByIdAndUpdate(id, updateProviderDto, { new: true }).exec(); 
    return updatedProvider ? updatedProvider.toObject() : null;
  }

  async remove(id: string): Promise<void> {
    await this.providerModel.findByIdAndDelete(id).exec();
  }

  async addProduct(providerId: string, productId: string){
    const provider: Provider = await this.providerModel.findById(providerId).exec();
    const product: Product = await this.productModel.findById(productId).exec();

    const providerHasProduct = provider.products.find((product: Product) => product._id == productId);
    if(providerHasProduct) throw new ProviderAlreadyHasProduct();

    provider.products.push(product);
    return provider.save();
    // return await this.productModel.findOneAndUpdate({_id: productId}, {user: provider}).exec();
  }

  async deleteProduct(providerId: string, productId: string){
    const provider: Provider = await this.providerModel.findById(providerId).exec();
    return await provider.updateOne({_id: providerId}, { "$pull": { "products": {"_id": productId}}}).exec();
    // await this.productModel.findOneAndDelete({provider: providerId}).exec();
  }

}
