import { TestBed } from "@automock/jest";
import { MedicalResultRepository } from "../../repositories/medical-result.repository";
import { MedicalResultManagementService } from "../medical-result-management.service";
import { MedicalResult } from "../../entities/medical-result.entity";
import { mockMedicalResult, mockMedicalResultArray } from "./stub/medical-result.stub";

describe('MedicalResultManagementService', () => {
  let service: MedicalResultManagementService;
  let repository: jest.Mocked<MedicalResultRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalResultManagementService).compile();

    service = unit;
    repository = unitRef.get(MedicalResultRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockDto: Omit<MedicalResult, 'id'> = {
      hasFile: true,
      examType: "Exam type",
      examSubtype: "Exam subtype",
      examName: "Exam",
      doctorDni: "1234567890",
      doctorFullname: "Name Lastname",
      doctorSignature: "/path/to/signature",
      order: undefined,
      report: undefined,
      externalKey: undefined,
      sendAttributes: [],
      createAt: new Date(),
      updateAt: new Date()
    }
    const mockedMedicalResult = mockMedicalResult();
    const expectResult = mockedMedicalResult;

    it('should create a new medical result', async () => {
      // Arrange
      repository.create.mockResolvedValue(mockedMedicalResult);

      // Act
      const result = await service.create(mockDto);

      // Assert
      expect(repository.create).toHaveBeenCalledWith(mockDto);
      expect(result).toEqual(expectResult);
    });
  });

  describe('findAll', () => {
    const mockedMedicalResults = mockMedicalResultArray();
    const expectResult = mockedMedicalResults;

    it('should find all medical results', async () => {
      // Arrange
      repository.find.mockResolvedValue(mockedMedicalResults);

      // Act
      const result = await service.findAll();

      // Assert
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(expectResult);
    });
  });

  describe('findAllByDoctor', () => {
    const mockedDoctor = "1234567890";
    const mockedMedicalResults = mockMedicalResultArray();
    const expectResult = mockedMedicalResults;

    it('should find all medical results by doctor', async () => {
      // Arrange
      repository.find.mockResolvedValue(mockedMedicalResults);

      // Act
      const result = await service.findAllByDoctor(mockedDoctor);

      // Assert
      expect(repository.find).toHaveBeenCalledWith({ where: { doctorDni: mockedDoctor } });
      expect(result).toEqual(expectResult);
    });
  });

  describe('findOne', () => {
    const id: number = 1;
    const mockedMedicalResult = mockMedicalResult();
    const expectResult = mockedMedicalResult;

    it('should find one medical result', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(mockedMedicalResult);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id }, relations: { order: { client: true } } });
      expect(result).toEqual(expectResult);
    });
  });

  describe('updateOne', () => {
    const id: number = 1;
    const mockDto: Partial<MedicalResult> = {
      examType: "mocked-type",
      examSubtype: "mocked-subtype",
      examName: "mocked-name",
      doctorDni: "mocked-dni",
      doctorFullname: "mocked-fullname",
      doctorSignature: "mocked-signature",
      hasFile: false
    }
    const mockedMedicalResult = mockMedicalResult();
    const expectResult = mockedMedicalResult;

    it('should update a medical result', async () => {
      // Arrange
      repository.findOneAndUpdate.mockResolvedValue(mockedMedicalResult);

      // Act
      const result = await service.updateOne(id, mockDto);

      // Assert
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: id }, mockDto);
      expect(result).toEqual(expectResult);
    });
  });

  describe('deleteOne', () => {
    const id: number = 1;

    it('should delete a medical result', async () => {
      // Arrange
      repository.findOneAndDelete.mockResolvedValue(undefined);

      // Act
      await service.deleteOne(id);

      // Assert
      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id: id });
    });
  });
});