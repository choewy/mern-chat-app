import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from '../item';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Item, (e) => e.group, { cascade: ['insert'] })
  @JoinTable({ name: 'item' })
  items: Item[];
}
