import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategy';
import { ConfigKey } from './enums';

export default registerAs(
  ConfigKey.TypeOrm,
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: '127.0.0.1',
    port: 33061,
    username: 'root',
    password: undefined,
    database: 'test',
    entities: [process.cwd() + '/dist/entities/**/*.entity.{ts,js}'],
    autoLoadEntities: true,
    logging: true,
    synchronize: true,
    dropSchema: true,
    namingStrategy: new SnakeNamingStrategy(),
  }),
);
