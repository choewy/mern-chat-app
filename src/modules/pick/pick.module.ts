import { Module } from '@nestjs/common';
import { PickRepository } from './pick.repository';
import { PickService } from './pick.service';

@Module({
  providers: [PickRepository, PickService],
})
export class PickModule {}
