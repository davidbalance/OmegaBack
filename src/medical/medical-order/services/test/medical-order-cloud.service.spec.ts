import { TestBed } from "@automock/jest";
import { MedicalOrderRepository } from "../../repositories/medical-order.repository";
import { MedicalOrderCloudService } from "../medical-order-cloud.service";
import { mockMedicalOrder } from "./stub/medical-order.stub";
import { MedicalOrderCloudResponseDto } from "../../dtos/response/base.medical-order-cloud.response.dto";

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
    const id: number = 1;
    const mockedOrder = mockMedicalOrder();
    const expectResult: MedicalOrderCloudResponseDto = {
      dni: "1234567890",
      fullname: "Test name Test lastname",
      fileResults: [
        {
          id: 1,
          examName: "Exam",
          type: "result",
          hasFile: true
        },
        {
          id: 2,
          examName: "Exam",
          type: "result",
          hasFile: true
        }
      ],
      fileReports: [
        {
          id: 1,
          examName: "Exam",
          type: "report",
          hasFile: true
        }
      ]
    };

    it('should return the medical order cloud data for the given id', async () => {
      // Arrange
      repository.findOne.mockResolvedValueOnce(mockedOrder);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(result).toEqual(expectResult);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id }, relations: { client: true, results: true } });
    });
  });
});