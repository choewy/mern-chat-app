import { Decimal } from 'decimal.js';
import { FindOperator, ValueTransformer } from 'typeorm';

export class DecimalTransformer implements ValueTransformer {
  to(value: Decimal | FindOperator<Decimal> | null): string | FindOperator<Decimal> | null {
    if (value == null) {
      return null;
    }

    if (value instanceof FindOperator) {
      return value;
    }

    return value.toFixed();
  }

  from(value: string | null): Decimal | null {
    if (value == null) {
      return null;
    }

    return new Decimal(value);
  }
}
