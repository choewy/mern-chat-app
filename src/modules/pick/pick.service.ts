import { RandomService } from '@/core/utils';
import { Item, ItemType, Level } from '@/entities';
import { Injectable } from '@nestjs/common';
import Decimal from 'decimal.js';
import { NotFoundGroupException } from './exceptions';
import { PickRepository } from './pick.repository';

@Injectable()
export class PickService {
  constructor(
    private readonly randomService: RandomService,
    private readonly repository: PickRepository,
  ) {}

  async pickLevel(): Promise<Level> {
    return this.randomService.pick(await this.repository.findLevels());
  }

  async pickItem(items: Item[]): Promise<Item> {
    return this.randomService.pick(items);
  }

  async getItemsByGroup(groupId: number): Promise<[Item, Item[]]> {
    const group = await this.repository.findGroupById(groupId);

    if (!group) {
      throw new NotFoundGroupException();
    }

    return group.items.reduce<[Item, Item[]]>(
      (prev, item) => {
        switch (item.type) {
          case ItemType.NoLuck:
            prev[0] = item;
            break;
          case ItemType.Normal:
            prev[1].push(item);
            break;
        }

        return prev;
      },
      [undefined, []],
    );
  }

  async calcTotalItemBonusRateByLevel(level: Level, noLuckItem: Item): Promise<[Decimal, Decimal]> {
    let totalBonusRate = new Decimal(0);
    let noLuckItemRate = new Decimal(0);

    const reducePercent = new Decimal(1).minus(level.reducePercent);

    if (!reducePercent.isZero()) {
      const cacledRate = new Decimal(noLuckItem.rate).times(reducePercent);
      totalBonusRate = new Decimal(noLuckItem.rate).minus(cacledRate);
      noLuckItemRate = cacledRate;
    }

    return [totalBonusRate, noLuckItemRate];
  }

  async calcBonusRatePerItem(totalBonusRate: Decimal, normalItems: Item[]): Promise<Decimal> {
    return totalBonusRate.isZero() ? totalBonusRate : totalBonusRate.dividedBy(normalItems.length);
  }

  async getPickItems(
    bonusRate: Decimal,
    generalItems: Item[],
    noLuckItem: Item,
    noLuckItemRate: Decimal,
  ): Promise<Item[]> {
    return [
      Object.assign<Item, Partial<Item>>(new Item(), {
        ...noLuckItem,
        rate: noLuckItemRate,
      }),
    ].concat(
      generalItems.map(({ rate, ...item }) =>
        Object.assign<Item, Partial<Item>>(new Item(), {
          ...item,
          rate: rate.plus(bonusRate),
        }),
      ),
    );
  }

  async getPickItem(
    groupId: number,
  ): Promise<[Level, Item, Decimal, Decimal, Decimal, Item[], Item, Item]> {
    const level = await this.pickLevel();

    const [noLuckItem, generalItems] = await this.getItemsByGroup(groupId);
    const [totalRate, noLuckRate] = await this.calcTotalItemBonusRateByLevel(level, noLuckItem);

    const bonusRate = await this.calcBonusRatePerItem(totalRate, generalItems);
    const pickItems = await this.getPickItems(bonusRate, generalItems, noLuckItem, noLuckRate);
    const pickItem = this.randomService.pick(pickItems);

    const originItem =
      noLuckItem.id === pickItem.id
        ? noLuckItem
        : generalItems.find(({ id }) => id === pickItem.id);

    return [level, noLuckItem, noLuckRate, totalRate, bonusRate, pickItems, pickItem, originItem];
  }
}
