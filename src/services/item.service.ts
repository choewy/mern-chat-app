import Decimal from 'decimal.js';
import { Level, Item, ItemType } from '../data';
import { RandomService } from '../utils';

export class ItemService {
  constructor(
    private readonly levels: Level[],
    private readonly items: Item[],
    private readonly randomService: RandomService,
  ) {
    const [equals, total] = this.validate(this.items);

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
    return this.items;
  }

  pickLevel(): Level {
    return this.randomService.pick(this.levels);
  }

  getNoLuckItem(): Item {
    return Object.assign<Partial<Item>, Item>(
      {},
      this.items.find(({ type }) => type === ItemType.NoLuck),
    );
  }

  getNormalItems(): Item[] {
    return this.items
      .filter(({ type }) => type === ItemType.Normal)
      .map((item) => Object.assign<Partial<Item>, Item>({}, item));
  }

  calcBonusRateByNoLuck(
    { rate, ...noLuckItem }: Item,
    level: Level,
  ): [Decimal, Item] {
    const newNoLuckItem = Object.assign<Partial<Item>, Partial<Item>>(
      { rate: rate.minus(level.noLuckReduceRate) },
      noLuckItem,
    ) as Item;

    if (newNoLuckItem.rate.isZero()) {
      return [new Decimal(0), newNoLuckItem];
    }

    console.log(newNoLuckItem.rate.isPositive());
    if (newNoLuckItem.rate.isPositive()) {
      return [newNoLuckItem.rate, newNoLuckItem];
    }

    return [rate, newNoLuckItem];
  }

  calcBonusRateByNormal(bonusRates: Decimal, normalItems: Item[]): Decimal {
    return bonusRates.isZero()
      ? new Decimal(0)
      : bonusRates.dividedBy(normalItems.length);
  }

  calcItemRateByBonusRate(
    normalItems: Item[],
    noLuckItem: Item,
    bonusRate: Decimal,
  ): Item[] {
    const items = normalItems.map((item) =>
      Object.assign<Item, Partial<Item>>(item, {
        rate: item.rate.plus(bonusRate),
      }),
    );

    if (!noLuckItem.rate.isZero() && noLuckItem.rate.isPositive()) {
      items.push(noLuckItem);
    }

    return items;
  }

  pickItem(adjustedItems: Item[]): Item {
    return this.randomService.pick(adjustedItems);
  }
}
