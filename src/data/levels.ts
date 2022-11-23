import Decimal from 'decimal.js';
import { Level } from './types';

export const Levels: Level[] = [
  {
    level: 1,
    rate: new Decimal(50),
    noLuckReduceRate: new Decimal(0),
  },
  {
    level: 2,
    rate: new Decimal(30),
    noLuckReduceRate: new Decimal(10),
  },
  {
    level: 3,
    rate: new Decimal(14),
    noLuckReduceRate: new Decimal(50),
  },
  {
    level: 4,
    rate: new Decimal(5),
    noLuckReduceRate: new Decimal(70),
  },
  {
    level: 5,
    rate: new Decimal(1),
    noLuckReduceRate: new Decimal(90),
  },
];
