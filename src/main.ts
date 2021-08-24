import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import express from 'express';
import path, { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {

  //   const app = await NestFactory.create(AppModule);

  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', './uploads'), {
    index: false,
    prefix: '/uploads',
  });
  await app.listen(3000);

  console.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();
