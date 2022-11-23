import { ItemRepository, ItemService, TestService } from './services';
import { RandomService } from './utils';
import { writeFileSync } from 'fs';

const itemService = new ItemService(new ItemRepository(), new RandomService());
const testService = new TestService(itemService);

writeFileSync(
  testService.createFileName(),
  JSON.stringify(
    [...Array(1000)].map(() => testService.e2e()),
    null,
    2,
  ),
);
