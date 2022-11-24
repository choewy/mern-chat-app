import Decimal from 'decimal.js';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from '../group';
import { DecimalTransformer } from '../transformers';
import { ItemType } from './enums';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ItemType,
  })
  type: ItemType;

  @Column({
    type: 'decimal',
    transformer: new DecimalTransformer(),
  })
  rate: Decimal;

  @ManyToOne(() => Group, (e) => e.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'group_id' })
  group: Group;
}
