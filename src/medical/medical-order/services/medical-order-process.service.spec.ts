import { TestBed } from "@automock/jest";
import { MedicalOrderRepository } from "../repositories/medical-order.repository";
import { MedicalOrderProcessService } from "./medical-order-process.service";

describe('MedicalOrderProcessService', () => {
  let service: MedicalOrderProcessService;
  let repository: jest.Mocked<MedicalOrderRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalOrderProcessService).compile();

    service = unit;
    repository = unitRef.get(MedicalOrderRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('should call the repository, create a query and return an array of string', () => {
    const mockedProcesses = [{ process: 'Pre-Ocupacional' }, { process: 'Pre-Ocupacional' }, { process: 'Post-Ocupacional' }, { process: 'Ocupacional' }];
    const expectedData = ['Pre-Ocupacional', 'Post-Ocupacional', 'Ocupacional'];

    beforeEach(() => {
      repository.query.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        distinct: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(mockedProcesses)
      } as any);
    });

    it('should build a query', async () => {
      // Arrange
      // Act
      const result = await service.retriveProcesses();

      // Assert
      expect(repository.query).toHaveBeenCalledWith('order');
      expect(repository.query().select).toHaveBeenCalledWith('order.process', 'process');
      expect(repository.query().distinct).toHaveBeenCalledWith(true);
      expect(repository.query().getRawMany).toHaveBeenCalled();
      expect(result).toEqual(expectedData);
    });
  });
});
