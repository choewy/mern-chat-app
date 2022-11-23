import Decimal from 'decimal.js';

export class RandomService {
  pick<T extends { rate: Decimal }>(rows: T[], precision = 3): T {
    let pickVal = Number.MAX_VALUE;
    let pickRow: T;

    for (const row of rows) {
      const devided = parseFloat(row.rate.toFixed(precision));
      const tempVal = -Math.log(Math.random()) / devided;

      if (tempVal < pickVal) {
        pickVal = tempVal;
        pickRow = row;
      }
    }

    return pickRow;
  }
}
