import Decimal from 'decimal.js';
import { Level, Item, Levels } from '../data';
import { RandomService } from '../utils';
import { ItemRepository } from './item.repository';

export class ItemService {
  private readonly levels = Levels;

  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly randomService: RandomService,
  ) {}

  getItems(): Item[] {
    return this.itemRepository.getItems();
  }

  pickLevel(): Level {
    return this.randomService.pick(this.levels);
  }

  pickItem(adjustedItems: Item[]): Item {
    return this.randomService.pick(adjustedItems);
  }

  calcBonusRateByNoLuck(noLuckItem: Item, level: Level): [Decimal, Decimal] {
    const rate = new Decimal(noLuckItem.rate).minus(level.noLuckReduceRate);

    let totalBonusRate: Decimal;
    let noLuckItemRate: Decimal;

    if (rate.isZero() || rate.isNegative()) {
      totalBonusRate = noLuckItem.rate;
      noLuckItemRate = new Decimal(0);
    } else {
      totalBonusRate = level.noLuckReduceRate;
      noLuckItemRate = rate;
    }

    return [totalBonusRate, noLuckItemRate];
  }

  calcBonusRateByNormalItems(
    totalBonusRate: Decimal,
    normalItems: Item[],
  ): Decimal {
    return totalBonusRate.isZero()
      ? new Decimal(0)
      : totalBonusRate.dividedBy(normalItems.length);
  }

  plusItemRateWithBonusRate(
    bonusRate: Decimal,
    normalItems: Item[],
    noLuckItem: Item,
    noLuckItemRate: Decimal,
  ): Item[] {
    const items = normalItems.map(({ rate, ...item }) =>
      Object.assign<Partial<Item>, Partial<Item>>(
        { rate: rate.plus(bonusRate) },
        item,
      ),
    ) as Item[];

    if (!noLuckItemRate.isZero() && noLuckItemRate.isPositive()) {
      const { rate, ...noLick } = noLuckItem;
      items.push(
        Object.assign<Partial<Item>, Partial<Item>>(
          { rate: noLuckItemRate },
          noLick,
        ) as Item,
      );
    }

    return items;
  }
}
