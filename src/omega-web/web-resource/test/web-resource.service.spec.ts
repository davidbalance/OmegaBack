import { Test, TestingModule } from '@nestjs/testing';
import { WebResourceService } from '../web-resource.service';

describe('WebResourceService', () => {
  let service: WebResourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebResourceService],
    }).compile();

    service = module.get<WebResourceService>(WebResourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
