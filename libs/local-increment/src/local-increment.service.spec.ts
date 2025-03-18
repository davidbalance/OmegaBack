import { Test, TestingModule } from '@nestjs/testing';
import { LocalIncrementService } from './local-increment.service';
import { IncrementRepository, IncrementRepositoryToken } from './repository/increment.repository';
import { IncrementDomain } from './domain/increment.domain';

describe('LocalIncrementService', () => {
  let service: LocalIncrementService;
  let repository: jest.Mocked<IncrementRepository>;

  beforeEach(async () => {
    repository = {
      findOne: jest.fn(),
      saveAsync: jest.fn(),
    } as unknown as jest.Mocked<IncrementRepository>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: IncrementRepositoryToken,
          useValue: repository
        },
        LocalIncrementService
      ],
    }).compile();

    service = module.get<LocalIncrementService>(LocalIncrementService);
  });

  it('should increase value if the Increment object exists', async () => {
    const mockedNext = 1;
    const mockedValue: IncrementDomain = {
      next: jest.fn().mockReturnValue(mockedNext)
    } as unknown as IncrementDomain;
    const spy = jest.spyOn(IncrementDomain, 'create').mockReturnValue(mockedValue);

    repository.findOne.mockResolvedValue(mockedValue);
    repository.saveAsync.mockResolvedValue(undefined);

    const testParam = 'test';

    const result = await service.next(testParam);

    expect(repository.findOne).toHaveBeenCalledWith(testParam);
    expect(spy).not.toHaveBeenCalled();
    expect(mockedValue.next).toHaveBeenCalled();
    expect(repository.saveAsync).toHaveBeenCalledWith(mockedValue);
    expect(result).toBe(mockedNext);
  });

  it('should create and increase value if the Increment object do not exists', async () => {
    const mockedNext = 1;
    const mockedValue: IncrementDomain = {
      next: jest.fn().mockReturnValue(mockedNext)
    } as unknown as IncrementDomain;
    const spy = jest.spyOn(IncrementDomain, 'create').mockReturnValue(mockedValue);

    repository.findOne.mockResolvedValue(null);
    repository.saveAsync.mockResolvedValue(undefined);

    const testParam = 'test';

    const result = await service.next(testParam);

    expect(repository.findOne).toHaveBeenCalledWith(testParam);
    expect(spy).toHaveBeenCalledWith(testParam);
    expect(mockedValue.next).toHaveBeenCalled();
    expect(repository.saveAsync).toHaveBeenCalledWith(mockedValue);
    expect(result).toBe(mockedNext);
  });
});
