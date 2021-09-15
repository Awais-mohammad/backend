import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { ProductsModule } from './products/products.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    UsersModule,
    // MongooseModule.forRoot('mongodb://localhost/brixton'),
    MongooseModule.forRoot('mongodb+srv://awais:awaisme@brixtonbest.88al0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&ssl=true', {
      useNewUrlParser: true
    }),
    AuthModule,
    ProductsModule,

    MulterModule.register({
      dest: './files',
    })

  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule { }
