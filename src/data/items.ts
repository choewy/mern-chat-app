import Decimal from 'decimal.js';
import { ItemType } from './enums';
import { Item } from './types';

export const Items: Item[] = [
  {
    id: 0,
    type: ItemType.NoLuck,
    name: 'no-luck',
    rate: new Decimal(30.015),
  },
  {
    id: 1,
    type: ItemType.Normal,
    name: 'item-01',
    rate: new Decimal(5.676),
  },
  {
    id: 2,
    type: ItemType.Normal,
    name: 'item-02',
    rate: new Decimal(10.61),
  },
  {
    id: 3,
    type: ItemType.Normal,
    name: 'item-03',
    rate: new Decimal(13.314),
  },
  {
    id: 4,
    type: ItemType.Normal,
    name: 'item-04',
    rate: new Decimal(15.698),
  },
  {
    id: 5,
    type: ItemType.Normal,
    name: 'item-05',
    rate: new Decimal(24.687),
  },
];
