import { Product, prodDocument } from './../schemas/products.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name) private prodModel: Model<prodDocument>
  ) {

  }

  create(createProdDto: CreateProductDto) {
    return new this.prodModel(createProdDto).save();
  }

  findAll() {
    return this.prodModel.find();
  }
  res: any;

  async searchProducts(name: string) {
    this.res = await this.prodModel.find({ "name": { "$regex": name, "$options": "i" } })

    if (this.res) {
      if (this.res.length != 0) {
        return this.res
      }
      else if (this.res.length == 0) {
        return 'product donnot exists!!'

      }
      else {
        return 'something went wrong check back later!!'
      }
    }
    else {
      return 'no data found!!'
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    this.prodModel.updateOne({ id }, { $set: updateProductDto })
    return "updated!!!"
  }

  remove(id: number) {
    return this.prodModel.deleteOne({ id });
  }
}
