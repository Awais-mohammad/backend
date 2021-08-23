import { NestFactory } from '@nestjs/core';
import express from 'express';
import path, { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
 
  await app.listen(3000);



}
bootstrap();
