import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // removes undefined properties in the DTO
    forbidNonWhitelisted: true, // throws an error if undefined properties are passed
    transform: true, // automatically converts types (e.g. string -> boolean)
  }));

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT', '3000');

  await app.listen(port);
}
bootstrap();
