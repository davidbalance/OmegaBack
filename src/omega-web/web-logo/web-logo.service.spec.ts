import { Test, TestingModule } from '@nestjs/testing';
import { WebLogoService } from './web-logo.service';

describe('WebLogoService', () => {
  let service: WebLogoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebLogoService],
    }).compile();

    service = module.get<WebLogoService>(WebLogoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
