import { TestBed } from "@automock/jest";
import { MedicalClientRepository } from "../repositories/medical-client.repository";
import { MedicalClientManagementService } from "./medical-client-management.service";
import { PatientGenderEnum } from "@/user/patient/enums/patient.enum";
import { mockMedicalClientEntity } from "../stub/medical-client-entity.stub";
import { MedicalClientRequestDto } from "../dtos/request/medical-client.base.dto";

describe('MedicalClientManagementService', () => {
  let service: MedicalClientManagementService;
  let repository: jest.Mocked<MedicalClientRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalClientManagementService).compile();

    service = unit;
    repository = unitRef.get(MedicalClientRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockDto: MedicalClientRequestDto = {
      name: 'John',
      lastname: 'Doe',
      dni: '1234567890',
      email: 'john.doe@example.com',
      gender: PatientGenderEnum.MALE,
      birthday: new Date()
    };
    const mockedClient = mockMedicalClientEntity();
    it('should create a medical client', async () => {
      // Arrange
      repository.create.mockResolvedValue(mockedClient);

      // Act
      const result = await service.create(mockDto);

      // Assert
      const { email, ...expectedDto } = mockDto;
      expect(repository.create).toHaveBeenCalledWith({ ...expectedDto, dni: mockDto.dni });
      expect(result).toEqual(mockedClient);
    });
  });

  describe('findOne', () => {
    it('should find a medical client by ID', async () => {
      // Arrange
      const id = 1;
      const mockedClient = mockMedicalClientEntity();
      repository.findOne.mockResolvedValue(mockedClient);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(mockedClient);
    });
  });

  describe('findOneByDni', () => {
    it('should find a medical client by DNI', async () => {
      // Arrange
      const dni = '1234567890';
      const mockedClient = mockMedicalClientEntity();
      repository.findOne.mockResolvedValue(mockedClient);

      // Act
      const result = await service.findOneByDni(dni);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { dni } });
      expect(result).toEqual(mockedClient);
    });
  });

  describe('updateOne', () => {
    it('should update a medical client', async () => {
      // Arrange
      const dni = '1234567890';
      const mockDto: Partial<Omit<MedicalClientRequestDto, 'email' | 'role' | 'dni'>> = {
        name: 'Jane',
      };
      const mockedClient = mockMedicalClientEntity();
      repository.findOneAndUpdate.mockResolvedValue(mockedClient);

      // Act
      const result = await service.updateOne(dni, mockDto);

      // Assert
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ dni }, mockDto);
      expect(result).toEqual(mockedClient);
    });
  });

  describe('deleteOne', () => {
    it('should delete a medical client', async () => {
      // Arrange
      const dni = '1234567890';
      repository.findOneAndDelete.mockResolvedValue(undefined);

      // Act
      await service.deleteOne(dni);

      // Assert
      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ dni });
    });
  });
});