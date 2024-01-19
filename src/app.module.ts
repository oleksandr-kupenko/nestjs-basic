import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './routes/users/users.module';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'process';
import { ReportsModule } from './routes/reports/reports.module';
import { dataModuleOptions } from '../ormconfig';

const cookieSession = require('cookie-session');


@Module({
  imports: [
    UsersModule,
    ReportsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
  TypeOrmModule.forRoot(dataModuleOptions)
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true, //delete extra properties from body
        forbidNonWhitelisted: true //return error when body has extra properties
      })
    }
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      cookieSession({
      keys: [this.configService.get('COOKIE_KEY')]
    })).forRoutes('*');
  }
}
