import { ItemService } from './services';

export class Test {
  constructor(private readonly itemService: ItemService) {}

  testCalcNoLuckRateByLevel() {
    const level = this.itemService.pickLevel();
    const noLuckItem = this.itemService.getNoLuckItem();
    const normalItems = this.itemService.getNormalItems();
    const [bonusRates, calcedNoLuckItem] =
      this.itemService.calcBonusRateByNoLuck(noLuckItem, level);

    const bonusRate = this.itemService.calcBonusRateByNormal(
      bonusRates,
      normalItems,
    );

    return {
      level: level.level,
      levelRate: level.rate.toFixed(3),
      noLuckOriginRate: noLuckItem.rate.toFixed(3),
      reduceNoLuckRate: level.noLuckReduceRate.toFixed(3),
      noLuckCalcedRate: calcedNoLuckItem.rate.toFixed(3),
      totalBonusRate: bonusRates.toFixed(3),
      devidedBy: normalItems.length,
      bonusRate: bonusRate.toFixed(3),
    };
  }
}
