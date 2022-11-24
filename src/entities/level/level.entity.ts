import Decimal from 'decimal.js';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DecimalTransformer } from '../transformers';

@Entity()
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'decimal',
    transformer: new DecimalTransformer(),
  })
  rate: Decimal;

  @Column({
    type: 'decimal',
    transformer: new DecimalTransformer(),
  })
  reducePercent: Decimal;
}
