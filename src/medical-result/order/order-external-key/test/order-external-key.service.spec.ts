import { Test, TestingModule } from '@nestjs/testing';
import { OrderExternalKeyService } from '../order-external-key.service';

describe('OrderExternalKeyService', () => {
  let service: OrderExternalKeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderExternalKeyService],
    }).compile();

    service = module.get<OrderExternalKeyService>(OrderExternalKeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
