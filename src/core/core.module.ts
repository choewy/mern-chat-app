import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigKey, configs } from './configs';
import { RandomService } from './utils';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configs,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return configService.get<TypeOrmModuleOptions>(ConfigKey.TypeOrm);
      },
    }),
  ],
  providers: [RandomService],
  exports: [RandomService],
})
export class CoreModule {}
