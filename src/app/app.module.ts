import { CoreModule } from '@/core';
import { MainModule } from '@/modules';
import { Module } from '@nestjs/common';

@Module({
  imports: [CoreModule, MainModule],
})
export class AppModule {}
