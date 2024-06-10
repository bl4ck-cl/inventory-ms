import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductAlreadyExistsException } from 'src/common/exceptions/product-already-exist';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) { };

  async create(createProductDto: CreateProductDto) {
    const existingProduct = await this.productModel.findOne({ sku: CreateProductDto.name }).exec();
    if (existingProduct) {
      throw new ProductAlreadyExistsException();
    }

    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async findAll() {
    return await this.productModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    return product ? product.toObject() : null;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec(); 
    return updatedProduct ? updatedProduct.toObject() : null;
  }

  async remove(id: string) {
    await this.productModel.findByIdAndDelete(id).exec();
  }
}
