import Decimal from 'decimal.js';
import { ItemType } from './enums';
import { Item } from './types';

export const Items: Item[] = [
  {
    id: 1,
    type: ItemType.NoLuck,
    name: 'no-luck',
    rate: new Decimal(30.015),
  },
  {
    id: 2,
    type: ItemType.Normal,
    name: 'ITEM_ID_02',
    rate: new Decimal(5.676),
  },
  {
    id: 3,
    type: ItemType.Normal,
    name: 'ITEM_ID_03',
    rate: new Decimal(10.61),
  },
  {
    id: 4,
    type: ItemType.Normal,
    name: 'ITEM_ID_04',
    rate: new Decimal(13.314),
  },
  {
    id: 5,
    type: ItemType.Normal,
    name: 'ITEM_ID_05',
    rate: new Decimal(15.698),
  },
  {
    id: 6,
    type: ItemType.Normal,
    name: 'ITEM_ID_06',
    rate: new Decimal(24.687),
  },
];
