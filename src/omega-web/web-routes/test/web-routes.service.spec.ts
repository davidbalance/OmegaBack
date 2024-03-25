import { Test, TestingModule } from '@nestjs/testing';
import { WebRoutesService } from '../web-routes.service';

describe('WebRoutesService', () => {
  let service: WebRoutesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebRoutesService],
    }).compile();

    service = module.get<WebRoutesService>(WebRoutesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
