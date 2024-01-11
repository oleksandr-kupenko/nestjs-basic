import { INestApplication, ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');
export const setupApp = (app: INestApplication) => {
  app.use(cookieSession({
    keys: ['custom-string']
  }))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //delete extra properties from body
      forbidNonWhitelisted: true //return error when body has extra properties
    })
  );
}
