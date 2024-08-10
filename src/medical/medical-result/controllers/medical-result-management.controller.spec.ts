import { TestBed } from "@automock/jest";
import { MedicalResultManagementService } from "../services/medical-result-management.service";
import { MedicalResultManagementController } from "./medical-result-management.controller";
import { mockMedicalResult, mockMedicalResultArray } from "../services/test/stub/medical-result.stub";
import { GetMedicalResultArrayResponseDto } from "../dtos/response/get.medical-result-array.response.dto";
import { GetMedicalResultResponseDto } from "../dtos/response/get.medical-result.response.dto";
import { PatchMedicalResultRequestDto } from "../dtos/request/patch.medical-result.request.dto";
import { PatchMedicalResultResponseDto } from "../dtos/response/patch.medical-result.response.dto";

describe('MedicalResultManagementController', () => {
  let controller: MedicalResultManagementController;
  let service: jest.Mocked<MedicalResultManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalResultManagementController).compile();

    controller = unit;
    service = unitRef.get(MedicalResultManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const mockedMedicalResult = mockMedicalResultArray();
    const expectResult: GetMedicalResultArrayResponseDto = { data: mockedMedicalResult as any };

    it('should call findAll service method', async () => {
      // Arrange
      service.findAll.mockResolvedValue(mockedMedicalResult);

      // Act
      const result = await controller.find();

      // Assert
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectResult);
    });
  });

  describe('findOne', () => {
    const id = 1;
    const mockedMedicalResult = mockMedicalResult();
    const expectResult: GetMedicalResultResponseDto = mockedMedicalResult as any;

    it('should call findOne service method with correct id', async () => {
      // Arrange
      service.findOne.mockResolvedValue(mockedMedicalResult);

      // Act
      const result = await controller.findOne(id.toString());

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectResult);
    });
  });

  describe('findByDoctor', () => {
    const user = '1234567890';
    const mockedMedicalResult = mockMedicalResultArray();
    const expectResult: GetMedicalResultArrayResponseDto = { data: mockedMedicalResult as any };

    it('should call findAllByDoctor service method with correct user', async () => {
      // Arrange
      service.findAllByDoctor.mockResolvedValue(mockedMedicalResult);

      // Act
      const result = await controller.findByDoctor(user);

      // Assert
      expect(service.findAllByDoctor).toHaveBeenCalledWith(user);
      expect(result).toEqual(expectResult);
    });
  });

  describe('updateOne', () => {
    const id = 1;
    const mockDto: PatchMedicalResultRequestDto = {
      examType: "Mocked exam name",
      examSubtype: "Mocked exam subtype",
      examName: "Mocked exam"
    };
    const mockedMedicalResult = mockMedicalResult();
    const expectResult: PatchMedicalResultResponseDto = mockedMedicalResult as any;

    it('should call updateOne service method with correct parameters', async () => {
      // Arrange
      service.updateOne.mockResolvedValue(mockedMedicalResult);

      // Act
      const result = await controller.updateOne(id, mockDto);

      // Assert
      expect(service.updateOne).toHaveBeenCalledWith(id, mockDto);
      expect(result).toEqual(expectResult);
    });
  });
});