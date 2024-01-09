import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['custom-string']
  }))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //delete extra properties from body
      forbidNonWhitelisted: true //return error when body has extra properties
    })
  );
  await app.listen(3000);
}
bootstrap();
