import { TestBed } from "@automock/jest";
import { MedicalOrderResultLocalController } from "./medical-order-result-local.controller";
import { MedicalOrderResultLocalService } from "../services/medical-order-result-local.service";
import { PostLocalMedicalResultOrderRequestDto } from "../dtos/request/local-medical-result-order.post.dto";

describe('MedicalOrderResultLocalController', () => {
  let controller: MedicalOrderResultLocalController;
  let service: jest.Mocked<MedicalOrderResultLocalService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalOrderResultLocalController).compile();
    controller = unit;
    service = unitRef.get(MedicalOrderResultLocalService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('shoudl create a medical client', async () => {
      // Arrange
      const data: PostLocalMedicalResultOrderRequestDto = {
        results: [],
        corporativeName: "Test corporative name",
        companyName: "Test company name",
        companyRuc: "1234567890001",
        branchName: "Test branch name",
        patientDni: "1234567890",
        process: "Post Ocupacional"
      };
      service.create.mockResolvedValue(undefined);

      // Act
      const result = await controller.create(data);

      // Assert
      expect(service.create).toHaveBeenCalledWith(data);
      expect(result).toBe('');
    });
  });
});
