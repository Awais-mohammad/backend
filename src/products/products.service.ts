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
  checkProd: any;
name:string;

  async create(createProdDto: CreateProductDto) {
   this.name = createProdDto.name
    console.log(this.name);
    this.checkProd = await this.prodModel.findOne({
      "name": { "$regex": this.name, "$options": "i" },
      "category": { "$regex": createProdDto.category, "$options": "i" },
    })
    console.log(this.checkProd);


    if (!this.checkProd) {
      return new this.prodModel(createProdDto).save();
    }
    else {
      return 'product with these specs already exists!!' + this.checkProd
    }
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

  prodBycats: any;

  async byCat(catName: string) {

    this.prodBycats = await this.prodModel.find({ "category": { "$regex": catName, "$options": "i" } })
    if (this.prodBycats) {
      if (this.prodBycats.length != 0) {
        return this.prodBycats
      }
      else if (this.prodBycats.length == 0) {
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

    return this.prodModel.updateOne({ id }, { $set: updateProductDto })

  }

  remove(id: string) {
    console.log(id);

    return this.prodModel.deleteOne({ _id: id });
  }
}
