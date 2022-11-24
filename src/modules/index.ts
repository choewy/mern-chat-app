import { Module } from '@nestjs/common';
import { PickModule } from './pick';

@Module({
  imports: [PickModule],
})
export class MainModule {}
