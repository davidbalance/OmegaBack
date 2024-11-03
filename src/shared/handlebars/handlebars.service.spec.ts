import { HandlebarsService } from './handlebars.service';
import { TestBed } from '@automock/jest';
import { NestFS } from '../nest-ext/nest-fs/nest-fs.type';
import { NestHandlebars } from '../nest-ext/nest-handlebars/nest-handlebars.type';
import { NestPath } from '../nest-ext/nest-path/nest-path.type';
import { HandlebarsModuleOptions } from './handlebars.module-options';
import { MODULE_OPTIONS_TOKEN } from './handlebars.module-definition';
import { NEST_HANDLEBARS } from '../nest-ext/nest-handlebars/inject-token';
import { NEST_PATH } from '../nest-ext/nest-path/inject-token';
import { NEST_FS } from '../nest-ext/nest-fs/inject-token';

describe('HandlebarsService', () => {
  let service: HandlebarsService;
  let options: jest.Mocked<HandlebarsModuleOptions>;
  let handlebars: jest.Mocked<NestHandlebars>;
  let path: jest.Mocked<NestPath>;
  let fs: jest.Mocked<NestFS>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(HandlebarsService).compile();

    service = unit;
    options = unitRef.get(MODULE_OPTIONS_TOKEN);
    handlebars = unitRef.get(NEST_HANDLEBARS);
    path = unitRef.get(NEST_PATH);
    fs = unitRef.get(NEST_FS);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
