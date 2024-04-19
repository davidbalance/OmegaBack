import { Test, TestingModule } from '@nestjs/testing';
import { LocalAuthorizationService } from './local-authorization.service';

describe('LocalAuthorizationService', () => {
  let service: LocalAuthorizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalAuthorizationService],
    }).compile();

    service = module.get<LocalAuthorizationService>(LocalAuthorizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
