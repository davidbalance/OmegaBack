import { HandlebarsService } from './handlebars.service';
import { TestBed } from '@automock/jest';
import { FS } from '../fs/fs.type';
import { Handlebars } from './handlebars.type';
import { Path } from '../path/path.type';
import { NEST_PATH } from '../path/inject-token';
import { NEST_FS } from '../fs/inject-token';
import { HandlebarsModuleOptions } from './handlebars.module-options';
import { MODULE_OPTIONS_TOKEN } from './handlebars.module-definition';

describe('HandlebarsService', () => {
  let service: HandlebarsService;
  let options: jest.Mocked<HandlebarsModuleOptions>;
  let handlebars: jest.Mocked<Handlebars>;
  let path: jest.Mocked<Path>;
  let fs: jest.Mocked<FS>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(HandlebarsService).compile();

    service = unit;
    options = unitRef.get(MODULE_OPTIONS_TOKEN);
    handlebars = unitRef.get('HANDLEBAR_BASE');
    path = unitRef.get(NEST_PATH);
    fs = unitRef.get(NEST_FS);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
