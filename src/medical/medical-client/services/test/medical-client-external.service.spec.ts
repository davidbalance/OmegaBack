import { TestBed } from "@automock/jest";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { MedicalClientEmailService } from "../medical-client-email.service";
import { MedicalClientEventService } from "../medical-client-event.service";
import { MedicalClientExternalService } from "../medical-client-external.service";
import { MedicalClientJobPositionService } from "../medical-client-job-position.service";
import { MedicalClientManagementService } from "../medical-client-management.service";
import { PostMedicalClientExternalRequestDto } from "../../dtos/request/post.medical-client-external.request.dto";
import { PatientGenderEnum } from "@/user/patient/enums/patient.enum";
import { mockMedicalClient } from "./stub/medical-client.stub";
import { NotFoundException } from "@nestjs/common";
import { PatchMedicalClientRequestDto } from "../../dtos/request/patch.medical-client.request.dto";

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
    const source = 'external-source';
    const body: PostMedicalClientExternalRequestDto = {
      dni: '1234567890',
      name: 'Test Client',
      lastname: 'Test Lastname',
      birthday: new Date(),
      gender: PatientGenderEnum.MALE,
      email: 'test@example.com',
      jobPosition: {
        key: 'test-key',
        name: 'Test job position'
      }
    };
    const mockedClient = mockMedicalClient();
    const expectResult = mockedClient;

    it('should create a new client, assign email, assign job position, and emit an event', async () => {
      // Arrange
      managementService.create.mockResolvedValueOnce(undefined);
      emailService.assignEmail.mockResolvedValueOnce(undefined);
      jobPositionService.assignJobPosition.mockResolvedValueOnce(mockedClient);
      const { jobPosition, ...data } = body;

      // Act
      const result = await service.create(source, body);

      // Assert
      expect(result).toEqual(expectResult);
      expect(managementService.create).toHaveBeenCalledWith(data);
      expect(emailService.assignEmail).toHaveBeenCalledWith(data.dni, { email: data.email });
      expect(jobPositionService.assignJobPosition).toHaveBeenCalledWith(data.dni, { jobPositionName: jobPosition.name });
      expect(eventService.emitExternalCreateEvent).toHaveBeenCalledWith(source, data, jobPosition);
    });
  });

  describe('findOne', () => {
    const dni: string = '1234567890';
    const mockedClient = mockMedicalClient();
    const expectResult = mockedClient;

    it('should find a client by dni', async () => {
      // Arrange
      managementService.findOneByDni.mockResolvedValueOnce(mockedClient);

      // Act
      const result = await service.findOne(dni);

      // Assert
      expect(result).toEqual(expectResult);
      expect(managementService.findOneByDni).toHaveBeenCalledWith(dni);
    });
  });

  describe('findOneOrCreate', () => {
    const source = 'external-source';
    const body: PostMedicalClientExternalRequestDto = {
      dni: '1234567890',
      name: 'Test Client',
      lastname: 'Test Lastname',
      birthday: new Date(),
      gender: PatientGenderEnum.MALE,
      email: 'test@example.com',
      jobPosition: {
        key: 'test-key',
        name: 'Test job position'
      }
    };
    const mockedClient = mockMedicalClient();
    const expectResult = mockedClient;

    it('should find a client by dni', async () => {
      // Arrange
      managementService.findOneByDni.mockResolvedValueOnce(mockedClient);

      // Act
      const result = await service.findOneOrCreate(source, body);

      // Assert
      expect(result).toEqual(expectResult);
      expect(managementService.findOneByDni).toHaveBeenCalledWith(body.dni);
      expect(managementService.create).not.toHaveBeenCalled();
      expect(emailService.assignEmail).not.toHaveBeenCalled();
      expect(jobPositionService.assignJobPosition).not.toHaveBeenCalled();
      expect(eventService.emitExternalCreateEvent).not.toHaveBeenCalled();
    });

    it('should not find a client so creates it', async () => {
      // Arrange
      managementService.findOneByDni.mockRejectedValueOnce(new NotFoundException());
      managementService.create.mockResolvedValueOnce(undefined);
      emailService.assignEmail.mockResolvedValueOnce(undefined);
      jobPositionService.assignJobPosition.mockResolvedValueOnce(mockedClient);
      const { jobPosition, ...data } = body;

      // Act
      const result = await service.findOneOrCreate(source, body);

      // Assert
      expect(result).toEqual(expectResult);
      expect(managementService.findOneByDni).toHaveBeenCalledWith(data.dni);
      expect(managementService.create).toHaveBeenCalledWith(data);
      expect(emailService.assignEmail).toHaveBeenCalledWith(data.dni, { email: data.email });
      expect(jobPositionService.assignJobPosition).toHaveBeenCalledWith(data.dni, { jobPositionName: jobPosition.name });
      expect(eventService.emitExternalCreateEvent).toHaveBeenCalledWith(source, data, jobPosition);
    })
  });

  describe('findOneAndUpdate', () => {
    const dni: string = '1234567890';
    const body: PatchMedicalClientRequestDto = {
      name: 'Updated Test Client'
    };
    const mockedClient = mockMedicalClient();

    it('should update a client by dni', async () => {
      // Arrange
      managementService.updateOne.mockResolvedValueOnce(mockedClient);

      // Act
      const result = await service.findOneAndUpdate(dni, body);

      // Assert
      expect(result).toEqual(mockedClient);
      expect(managementService.updateOne).toHaveBeenCalledWith(dni, body);
    });
  });
});