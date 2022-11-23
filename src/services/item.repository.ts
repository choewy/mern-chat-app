import Decimal from 'decimal.js';
import { Item, Items } from '../data';

export class ItemRepository {
  private readonly $items = Items;

  constructor() {
    const [equals, total] = this.validate(this.$items);

    if (!equals) {
      throw new Error(`Item's total rate is not 100(current : ${total})`);
    }
  }

  private validate<T extends { rate: Decimal }>(
    rows: T[],
    maxRate: Decimal = new Decimal(100),
  ): [boolean, number] {
    const total = rows.reduce<Decimal>((rate, row) => {
      return rate.plus(row.rate);
    }, new Decimal(0));

    return [total.equals(maxRate), parseFloat(total.toFixed(3))];
  }

  getItems(): Item[] {
    return this.$items;
  }
}
