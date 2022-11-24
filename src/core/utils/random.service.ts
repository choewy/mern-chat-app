import { Injectable } from '@nestjs/common';
import Decimal from 'decimal.js';

@Injectable()
export class RandomService {
  pick<T extends { rate: Decimal }>(items: T[], precision = 3): T {
    let pickVal = Number.MAX_VALUE;
    let pickItem: T;

    for (const item of items) {
      const tempVal = -Math.log(Math.random()) / parseFloat(item.rate.toFixed(precision));
      if (tempVal < pickVal) {
        pickVal = tempVal;
        pickItem = item;
      }
    }

    return pickItem;
  }
}
