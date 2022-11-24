import { RandomService } from '@/core/utils';
import { Group, Item, ItemType, Level } from '@/entities';
import { Test } from '@nestjs/testing';
import Decimal from 'decimal.js';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { DataSource, FindOneOptions } from 'typeorm';
import { NotFoundGroupException } from './exceptions';
import { PickRepository } from './pick.repository';
import { PickService } from './pick.service';

const data = {
  Level: [
    {
      level: 1,
      rate: new Decimal(50),
      reducePercent: new Decimal(0),
    },
    {
      level: 2,
      rate: new Decimal(30),
      reducePercent: new Decimal(0.1),
    },
    {
      level: 3,
      rate: new Decimal(14),
      reducePercent: new Decimal(0.5),
    },
    {
      level: 4,
      rate: new Decimal(5),
      reducePercent: new Decimal(0.7),
    },
    {
      level: 5,
      rate: new Decimal(1),
      reducePercent: new Decimal(0.9),
    },
  ].map(
    (level, id) =>
      Object.assign(
        new Level(),
        Object.assign(level, {
          id: id + 1,
        }),
      ) as Level,
  ),
  Group: [
    {
      name: 'TEST',
      items: [
        {
          groupId: 1,
          type: ItemType.NoLuck,
          name: '꽝',
          rate: new Decimal(30.015),
        },
        {
          groupId: 1,
          type: ItemType.Normal,
          name: 'A',
          rate: new Decimal(5.676),
        },
        {
          groupId: 1,
          type: ItemType.Normal,
          name: 'B',
          rate: new Decimal(10.61),
        },
        {
          groupId: 1,
          type: ItemType.Normal,
          name: 'C',
          rate: new Decimal(13.314),
        },
        {
          groupId: 1,
          type: ItemType.Normal,
          name: 'D',
          rate: new Decimal(15.698),
        },
        {
          groupId: 1,
          type: ItemType.Normal,
          name: 'E',
          rate: new Decimal(24.687),
        },
      ].map(
        (item, id) =>
          Object.assign(
            new Item(),
            Object.assign(item, {
              id: id + 1,
            }),
          ) as Item,
      ),
    },
  ].map(
    (group, id) =>
      Object.assign(
        new Group(),
        Object.assign(group, {
          id: id + 1,
        }),
      ) as Group,
  ),
};

const DataSourceProvider = {
  provide: DataSource,
  useFactory: () => ({
    getRepository<T>(entity: T) {
      return {
        async find(): Promise<T[]> {
          return data[entity['name']];
        },
        async findOne(options: FindOneOptions<T>): Promise<T> {
          return data[entity['name']].find(({ id }) => id === options.where['id']);
        },
      };
    },
  }),
};

describe('pick-service', () => {
  let pickService: PickService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [DataSourceProvider, RandomService, PickRepository, PickService],
    }).compile();

    pickService = module.get(PickService);
  });

  it('PickService의 인스턴스가 정의되어 있어야 한다.', () => {
    expect(pickService).toBeDefined();
  });

  it('존재하지 않는 그룹을 조회하면 NotFoundGroupException을 던진다.', async () => {
    await expect(pickService.getItemsByGroup(999)).rejects.toThrowError(
      new NotFoundGroupException(),
    );
  });

  it('임의의 레벨을 뽑는다.', async () => {
    await expect(pickService.pickLevel()).resolves.toBeInstanceOf(Level);
  });

  it('id가 1번인 그룹의 데이터를 조회한다.', async () => {
    await expect(pickService.getItemsByGroup(1)).resolves.toEqual([
      data.Group[0].items[0],
      data.Group[0].items.slice(1),
    ]);
  });

  it('1000번 랜덤 추출 후 로그 파일로 저장한다.', async () => {
    const dirPath = process.cwd() + '/logs';
    const filename = `pick_service_spec_${Date.now()}.json`;

    if (!existsSync(dirPath)) {
      mkdirSync(dirPath);
    }

    const results = await Promise.all(
      [...Array(1000)].map(async () => {
        const [
          level,
          noLuckItem,
          noLuckRate,
          totalRate,
          bonusRate,
          pickItems,
          pickItem,
          originItem,
        ] = await pickService.getPickItem(1);

        return {
          level,
          noLuckItem: {
            'rate(origin)': noLuckItem.rate,
            'rate(reduce - %)': level.reducePercent,
            'rate(reduce - %p)': totalRate,
            'rate(final)': noLuckRate,
          },
          bonus: {
            'rate(total)': totalRate,
            'count(items)': pickItems.length,
            'rate(per-item)': bonusRate,
          },
          items: {
            'names(all)': pickItems.map(({ name }) => name),
            'rate(total)': pickItems.reduce<Decimal>(
              (prev, { rate }) => prev.plus(rate),
              new Decimal(0),
            ),
          },
          picked: {
            name: originItem.name,
            'rate(origin)': originItem.rate,
            'rate(final)': pickItem.rate,
          },
        };
      }),
    );

    writeFileSync(`${dirPath}/${filename}`, JSON.stringify(results, null, 2));
  });
});
