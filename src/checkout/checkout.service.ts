import { Checkout } from './entities/checkout.entity';
import { Order, orderDocument } from './../schemas/orders.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';
import { Model } from 'mongoose';

@Injectable()
export class CheckoutService {

  constructor(@InjectModel(Order.name) private checkoutmodel: Model<orderDocument>) {

  }

  create(createCheckoutDto: CreateCheckoutDto) {
    return new this.checkoutmodel(createCheckoutDto).save();
  }


  findAll() {
    return this.checkoutmodel.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} checkout`;
  }

  update(id: number, updateCheckoutDto: UpdateCheckoutDto) {
    return `This action updates a #${id} checkout`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkout`;
  }
}
