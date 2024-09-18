import { TestBed } from "@automock/jest";
import { MedicalClientEmailService } from "./medical-client-email.service";
import { MedicalClientEventService } from "./medical-client-event.service";
import { MedicalClientExternalService } from "./medical-client-external.service";
import { MedicalClientJobPositionService } from "./medical-client-job-position.service";
import { MedicalClientManagementService } from "./medical-client-management.service";
import { ExternalMedicalClientRequestDto } from "../dtos/request/external-medical-client.base.dto";
import { PatientGenderEnum } from "@/user/patient/enums/patient.enum";
import { mockMedicalClientEntity } from "../stub/medical-client-entity.stub";

describe('MedicalClientExternalService', () => {
  let service: MedicalClientExternalService;
  let managementService: jest.Mocked<MedicalClientManagementService>;
  let emailService: jest.Mocked<MedicalClientEmailService>;
  let jobPositionService: jest.Mocked<MedicalClientJobPositionService>;
  let eventService: jest.Mocked<MedicalClientEventService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalClientExternalService).compile();

    service = unit;
    managementService = unitRef.get(MedicalClientManagementService);
    emailService = unitRef.get(MedicalClientEmailService);
    jobPositionService = unitRef.get(MedicalClientJobPositionService);
    eventService = unitRef.get(MedicalClientEventService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const source = 'test-source';
    const mockDto: ExternalMedicalClientRequestDto = {
      name: 'John',
      lastname: 'Doe',
      dni: '1234567890',
      email: 'john.doe@example.com',
      birthday: new Date(),
      gender: PatientGenderEnum.MALE,
      jobPosition: {
        key: "test-key",
        name: 'Doctor',
      },
    };
    const mockedClient = mockMedicalClientEntity();

    it('should create a medical client', async () => {
      // Arrange
      managementService.create.mockResolvedValue(mockedClient);
      emailService.assignEmail.mockResolvedValue(undefined);
      jobPositionService.assignJobPosition.mockResolvedValue(mockedClient);

      // Act
      const result = await service.create(source, mockDto);

      // Assert
      const { jobPosition, ...expectedDto } = mockDto;
      expect(managementService.create).toHaveBeenCalledWith(expectedDto);
      expect(emailService.assignEmail).toHaveBeenCalledWith(mockDto.dni, { email: mockDto.email });
      expect(jobPositionService.assignJobPosition).toHaveBeenCalledWith(mockDto.dni, { jobPositionName: mockDto.jobPosition.name });
      expect(eventService.emitExternalCreateEvent).toHaveBeenCalledWith(source, expectedDto, mockDto.jobPosition);
      expect(result).toEqual(mockedClient);
    });

    it('should create a medical client without job position', async () => {
      // Arrange
      managementService.create.mockResolvedValue(mockedClient);
      emailService.assignEmail.mockResolvedValue(undefined);
      const { jobPosition, ...newMockDto } = mockDto;

      // Act
      const result = await service.create(source, newMockDto);

      // Assert
      expect(managementService.create).toHaveBeenCalledWith(newMockDto);
      expect(emailService.assignEmail).toHaveBeenCalledWith(mockDto.dni, { email: mockDto.email });
      expect(jobPositionService.assignJobPosition).not.toHaveBeenCalled();
      expect(eventService.emitExternalCreateEvent).toHaveBeenCalledWith(source, newMockDto, undefined);
      expect(result).toEqual(mockedClient);
    });
  });

  describe('findOne', () => {
    it('should find a medical client by DNI', async () => {
      // Arrange
      const dni = '1234567890';
      const mockedClient = mockMedicalClientEntity();
      managementService.findOneByDni.mockResolvedValue(mockedClient);

      // Act
      const result = await service.findOne(dni);

      // Assert
      expect(managementService.findOneByDni).toHaveBeenCalledWith(dni);
      expect(result).toEqual(mockedClient);
    });
  });

  describe('findOneOrCreate', () => {
    const source = 'test-source';
    const mockDto: ExternalMedicalClientRequestDto = {
      name: 'John',
      lastname: 'Doe',
      dni: '1234567890',
      email: 'john.doe@example.com',
      birthday: new Date(),
      gender: PatientGenderEnum.MALE,
    };
    const mockedClient = mockMedicalClientEntity();

    it('should find a medical client by DNI', async () => {
      // Arrange
      managementService.findOneByDni.mockResolvedValue(mockedClient);

      // Act
      const result = await service.findOneOrCreate(source, mockDto);

      // Assert
      expect(managementService.findOneByDni).toHaveBeenCalledWith(mockDto.dni);
      expect(managementService.create).not.toHaveBeenCalled();
      expect(result).toEqual(mockedClient);
    });

    it('should create a medical client if not found', async () => {
      // Arrange
      managementService.findOneByDni.mockRejectedValue(new Error());
      managementService.create.mockResolvedValue(mockedClient);
      emailService.assignEmail.mockResolvedValue(undefined);

      // Act
      const result = await service.findOneOrCreate(source, mockDto);

      // Assert
      expect(managementService.findOneByDni).toHaveBeenCalledWith(mockDto.dni);
      expect(managementService.create).toHaveBeenCalledWith(mockDto);
      expect(emailService.assignEmail).toHaveBeenCalledWith(mockDto.dni, { email: mockDto.email });
      expect(result).toEqual(mockedClient);
    });
  });

  describe('findOneAndUpdate', () => {
    const dni = '1234567890';
    const mockDto: Partial<Omit<ExternalMedicalClientRequestDto, 'email'>> = {
      name: 'Jane',
    };
    const mockedClient = mockMedicalClientEntity();

    it('should update a medical client', async () => {
      // Arrange
      managementService.updateOne.mockResolvedValue(mockedClient);

      // Act
      const result = await service.findOneAndUpdate(dni, mockDto);

      // Assert
      expect(managementService.updateOne).toHaveBeenCalledWith(dni, mockDto);
      expect(result).toEqual(mockedClient);
    });
  });
});