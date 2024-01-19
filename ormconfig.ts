import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const dbConfig: DataSourceOptions = {
  synchronize: false,
  migrations: ['migrations/*.js'],
  type: null,
  database: null,
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':

    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
      migrationsRun: true
    });
    break;
  case 'production':
    break;
  default:
    throw new Error('unknown environment')
}

export const dataModuleOptions: TypeOrmModuleOptions = dbConfig;

export default new DataSource(dbConfig);
