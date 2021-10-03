import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import express from 'express';
import path, { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {

 
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
 
  // app.enableCors();
 
  app.useStaticAssets(join(__dirname, '..', './uploads'), {
    index: false,
    prefix: '/uploads',
  });
 
  const port: number = parseInt(`${process.env.PORT}`) || 3000;
  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();
