import { orderSchema } from './../schemas/orders.schema';
import { Order } from './../schemas/orders.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: orderSchema }])
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService],
  exports: [CheckoutService]
})
export class CheckoutModule { }
