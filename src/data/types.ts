import Decimal from 'decimal.js';
import { ItemType } from './enums';

export type Level = {
  level: number;
  rate: Decimal;
  noLuckReduceRate: Decimal;
};

export type Item = {
  id: number;
  type: ItemType;
  name: string;
  rate: Decimal;
};
