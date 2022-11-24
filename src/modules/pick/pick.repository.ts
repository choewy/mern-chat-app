import { Group, Level } from '@/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PickRepository {
  private readonly levelRepo: Repository<Level>;
  private readonly groupRepo: Repository<Group>;

  constructor(private readonly dataSource: DataSource) {
    this.levelRepo = this.dataSource.getRepository(Level);
    this.groupRepo = this.dataSource.getRepository(Group);
  }

  async findLevels(): Promise<Level[]> {
    return this.levelRepo.find();
  }

  async findGroupById(groupId: number): Promise<Group> {
    return this.groupRepo.findOne({
      relations: { items: true },
      where: { id: groupId },
    });
  }
}
