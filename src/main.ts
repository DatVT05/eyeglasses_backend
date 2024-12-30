import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const publicPath = join(__dirname, '..', 'public');

  app.use('/public', express.static(publicPath));
  
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
