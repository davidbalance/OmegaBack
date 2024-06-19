import { Test, TestingModule } from '@nestjs/testing';
import { MedicalClientService } from './medical-client.service';

describe('MedicalClientService', () => {
  let service: MedicalClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalClientService],
    }).compile();

    service = module.get<MedicalClientService>(MedicalClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
