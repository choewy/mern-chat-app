import Decimal from 'decimal.js';
import { Item, ItemType } from '../data';
import { ItemService } from './item.service';
import { existsSync, mkdirSync } from 'fs';

export class TestService {
  private readonly TEMP_DIR_PATH = process.cwd() + '/temp';

  constructor(private readonly itemService: ItemService) {
    if (!existsSync(this.TEMP_DIR_PATH)) {
      mkdirSync(this.TEMP_DIR_PATH, { recursive: true });
    }
  }

  createFileName() {
    const today = new Date();

    const date = [
      today.getFullYear(),
      ('0' + (today.getMonth() + 1)).slice(-2),
      ('0' + today.getDate()).slice(-2),
    ].join('-');

    const time = [
      ('0' + today.getHours()).slice(-2),
      ('0' + today.getMinutes()).slice(-2),
      ('0' + today.getSeconds()).slice(-2),
    ].join('');

    return [this.TEMP_DIR_PATH, '/', [date, time].join('_'), '.json'].join('');
  }

  e2e() {
    const items = this.itemService.getItems();

    const [noLuckItem, normalItems] = items.reduce<[Item, Item[]]>(
      (prev, item) => {
        if (item.type === ItemType.NoLuck) {
          prev[0] = item;
        }

        if (item.type === ItemType.Normal) {
          prev[1].push(item);
        }

        return prev;
      },
      [undefined, []],
    );

    const level = this.itemService.pickLevel();

    const [totalBonusRate, noLuckItemRate] =
      this.itemService.calcBonusRateByNoLuck(noLuckItem, level);

    const bonusRate = this.itemService.calcBonusRateByNormalItems(
      totalBonusRate,
      normalItems,
    );

    const calcedItems = this.itemService.plusItemRateWithBonusRate(
      bonusRate,
      normalItems,
      noLuckItem,
      noLuckItemRate,
    );

    const pickedItem = this.itemService.pickItem(calcedItems);
    const originItem = items.find(({ id }) => id === pickedItem.id);

    return {
      level: {
        level: level.level,
        reduceRate: level.noLuckReduceRate,
      },
      noLuckItemRate: {
        origin: noLuckItem.rate,
        reduce: level.noLuckReduceRate,
        final: noLuckItemRate,
      },
      bonusRate: {
        total: totalBonusRate,
        count: normalItems.length,
        final: bonusRate,
      },
      calcedItems: {
        names: calcedItems.map(({ name }) => name),
        totalRate: calcedItems.reduce<Decimal>(
          (prev, { rate }) => prev.plus(rate),
          new Decimal(0),
        ),
      },
      pickedItemRate: {
        origin: originItem.rate,
        final: pickedItem.rate,
      },
    };
  }
}
