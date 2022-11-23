import { Items, Levels } from './data';
import { ItemService } from './services';
import { Test } from './test';
import { RandomService } from './utils';

const test = new Test(new ItemService(Levels, Items, new RandomService()));

[...Array(100)].forEach(() => {
  console.log(test.testCalcNoLuckRateByLevel());
});
