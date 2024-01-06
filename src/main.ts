import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //delete extra properties from body
      forbidNonWhitelisted: true //return error when body has extra properties
    })
  );
  await app.listen(3000);
}
bootstrap();
