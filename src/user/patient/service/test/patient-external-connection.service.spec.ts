import { TestBed } from '@automock/jest';
import { PatientExternalConnectionService } from '../patient-external-connection.service';
import { PatientEventService } from '../patient-event.service';
import { PatientManagementService } from '../patient-management.service';
import { PostPatientExternalRequestDto } from '../../dtos/request/post.patient-external.request.dto';
import { PatientGenderEnum } from '../../enums/patient.enum';
import { mockFlatPatient } from './stub/patient-flat.stub';
import { NotFoundException } from '@nestjs/common';
import { PatchPatientRequestDto } from '../../dtos/request/patch.patient.request.dto';

describe('PatientExternalConnectionService', () => {
  let service: PatientExternalConnectionService;
  let managementService: jest.Mocked<PatientManagementService>;
  let eventService: jest.Mocked<PatientEventService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(PatientExternalConnectionService).compile();

    service = unit;
    managementService = unitRef.get(PatientManagementService);
    eventService = unitRef.get(PatientEventService);

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const source: string = 'external-source';
    const mockDto: PostPatientExternalRequestDto = {
      email: 'test@email.com',
      jobPosition: {
        key: 'test-key',
        name: 'job position'
      },
      gender: PatientGenderEnum.MALE,
      birthday: new Date('2000-01-01'),
      name: 'Name',
      lastname: 'Lastname',
      dni: '1234567890'
    };
    const mockedPatient = mockFlatPatient();
    const expectResult = mockedPatient;

    it('should create a new patient and emit an event', async () => {
      // Arrange
      managementService.create.mockResolvedValue(mockedPatient);
      const { jobPosition, ...data } = mockDto;

      // Act
      const result = await service.create(source, mockDto);

      // Assert
      expect(managementService.create).toHaveBeenCalledWith(data);
      expect(eventService.emitMedicalClientExternalCreateEvent).toHaveBeenCalledWith(source, data, jobPosition);
      expect(result).toEqual(expectResult);
    });
  });

  describe('findOne', () => {
    const mockedDni = '1234567890';
    const mockedPatient = mockFlatPatient();
    const expectResult = mockedPatient;

    it('should find one patient by dni', async () => {
      // Arrange
      managementService.findOneByDni.mockResolvedValue(mockedPatient);

      // Act
      const result = await service.findOne(mockedDni);

      // Assert
      expect(managementService.findOneByDni).toHaveBeenCalledWith(mockedDni);
      expect(result).toEqual(expectResult);
    });
  });

  describe('findOneOrCreate', () => {
    const source: string = 'external-source';
    const mockDto: PostPatientExternalRequestDto = {
      email: 'test@email.com',
      jobPosition: {
        key: 'test-key',
        name: 'job position'
      },
      gender: PatientGenderEnum.MALE,
      birthday: new Date('2000-01-01'),
      name: 'Name',
      lastname: 'Lastname',
      dni: '1234567890'
    };
    const mockedPatient = mockFlatPatient();
    const expectResult = mockedPatient;

    it('should find an existing patient by dni', async () => {
      // Arrange
      managementService.findOneByDni.mockResolvedValue(mockedPatient);
      managementService.create.mockResolvedValue(undefined);

      // Act
      const result = await service.findOneOrCreate(source, mockDto);

      // Assert
      expect(managementService.findOneByDni).toHaveBeenCalledWith(mockDto.dni);
      expect(managementService.create).not.toHaveBeenCalled();
      expect(eventService.emitMedicalClientExternalCreateEvent).not.toHaveBeenCalled();
      expect(result).toEqual(mockedPatient);
    });

    it('should create a new patient if not found', async () => {
      // Arrange
      managementService.findOneByDni.mockRejectedValueOnce(new NotFoundException());
      managementService.create.mockResolvedValue(mockedPatient);
      const { jobPosition, ...data } = mockDto;

      // Act
      const result = await service.findOneOrCreate(source, mockDto);

      // Assert
      expect(managementService.findOneByDni).toHaveBeenCalledWith(mockDto.dni);
      expect(managementService.create).toHaveBeenCalledWith(data);
      expect(eventService.emitMedicalClientExternalCreateEvent).toHaveBeenCalledWith(source, data, jobPosition);
      expect(result).toEqual(expectResult);
    });
  });

  describe('findOneAndUpdate', () => {
    const mockedDni = '1234567890';
    const mockedDto: PatchPatientRequestDto = {
      birthday: new Date('2000-01-01'),
      gender: PatientGenderEnum.MALE,
      lastname: 'Lastname',
      name: 'Name'
    };
    const mockedPatient = mockFlatPatient();
    const expectResult = mockedPatient;

    it('should update a patient by dni', async () => {
      // Arrange
      managementService.updateOne.mockResolvedValue(mockedPatient);

      // Act
      const result = await service.findOneAndUpdate(mockedDni, mockedDto);

      // Assert
      expect(managementService.updateOne).toHaveBeenCalledWith(mockedDni, mockedDto);
      expect(result).toEqual(expectResult);
    });
  });
});
