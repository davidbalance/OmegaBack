import { TestBed } from "@automock/jest";
import { MedicalOrderRepository } from "../repositories/medical-order.repository";
import { MedicalOrderCloudService } from "./medical-order-cloud.service";
import { mockMedicalOrderEntity } from "../stubs/medical-order-entity.stub";

describe('MedicalOrderCloudService', () => {
  let service: MedicalOrderCloudService;
  let repository: jest.Mocked<MedicalOrderRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalOrderCloudService).compile();

    service = unit;
    repository = unitRef.get(MedicalOrderRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('should return cloud data for a medical order', async () => {
      // Arrange
      const id = 1;
      const mockedOrder = mockMedicalOrderEntity();
      repository.findOne.mockResolvedValue(mockedOrder);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id }, relations: { client: true, results: true } });
      expect(result).toEqual({
        dni: mockedOrder.client.dni,
        fullname: `${mockedOrder.client.name} ${mockedOrder.client.lastname}`,
        fileResults: mockedOrder.results.map(e => ({
          id: e.id,
          examName: e.examName,
          hasFile: e.hasFile,
          type: 'result'
        })),
        fileReports: mockedOrder.results.filter(e => !!e.report).map(e => ({
          id: e.id,
          examName: e.examName,
          hasFile: e.hasFile,
          type: 'report'
        }))
      });
    });
  });
});