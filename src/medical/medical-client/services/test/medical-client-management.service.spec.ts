import { TestBed } from "@automock/jest";
import { MedicalClientRepository } from "../../repositories/medical-client.repository";
import { MedicalClientManagementService } from "../medical-client-management.service";
import { PostMedicalClientRequestDto } from "../../dtos/request/post.medical-client.request.dto";
import { PatientGenderEnum } from "@/user/patient/enums/patient.enum";
import { mockMedicalClient, mockMedicalClients } from "./stub/medical-client.stub";
import { PatchMedicalClientRequestDto } from "../../dtos/request/patch.medical-client.request.dto";

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
    const body: PostMedicalClientRequestDto = {
      dni: '1234567890',
      name: 'Test Client',
      lastname: 'Test Lastname',
      birthday: new Date(),
      gender: PatientGenderEnum.MALE,
      email: 'test@example.com'
    };
    const mockedClient = mockMedicalClient();
    const expectResult = mockedClient;

    it('should create a new client', async () => {
      // Arrange
      repository.create.mockResolvedValueOnce(mockedClient);
      const { email, ...data } = body;

      // Act
      const result = await service.create(body);

      // Assert
      expect(result).toEqual(expectResult);
      expect(repository.create).toHaveBeenCalledWith(data);
    });
  });

  describe('findOne', () => {
    const id: number = 1;
    const mockedClient = mockMedicalClient();
    const expectResult = mockedClient;

    it('should return a client by id', async () => {
      // Arrange
      repository.findOne.mockResolvedValueOnce(mockedClient);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(result).toEqual(expectResult);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id } });
    });
  });

  describe('findOneByDni', () => {
    const dni: string = '1234567890';
    const mockedClient = mockMedicalClient();
    const expectResult = mockedClient;

    it('should return a client by dni', async () => {
      // Arrange
      repository.findOne.mockResolvedValueOnce(mockedClient);

      // Act
      const result = await service.findOneByDni(dni);

      // Assert
      expect(result).toEqual(expectResult);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { dni: dni } });
    });
  });

  describe('findClientsByDoctor', () => {
    const doctorDni: string = '1234567890';
    const mockedClients = mockMedicalClients();
    const expectResult = mockedClients;

    beforeEach(() => {
      repository.query.mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValueOnce(mockedClients)
      } as any);
    });

    it('should return all clients for the given doctor dni', async () => {
      // Arrange

      // Act
      const result = await service.findClientsByDoctor(doctorDni);

      // Assert
      expect(result).toEqual(expectResult);
      expect(repository.query).toHaveBeenCalledWith('client');
      expect(repository.query().leftJoinAndSelect).toHaveBeenCalledWith('client.medicalOrders', 'medicalOrder');
      expect(repository.query().leftJoinAndSelect).toHaveBeenCalledWith('medicalOrder.results', 'medicalResult');
      expect(repository.query().where).toHaveBeenCalledWith('medicalResult.doctorDni = :dni', { dni: doctorDni });
      expect(repository.query().getMany).toHaveBeenCalled();
    });
  });

  describe('updateOne', () => {
    const dni: string = '1234567890';
    const body: PatchMedicalClientRequestDto = {
      name: 'Updated Test Client'
    };
    const mockedClient = mockMedicalClient();
    const expectResult = mockedClient;

    it('should update a client', async () => {
      // Arrange
      repository.findOneAndUpdate.mockResolvedValueOnce(mockedClient);

      // Act
      const result = await service.updateOne(dni, body);

      // Assert
      expect(result).toEqual(expectResult);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ dni: dni }, body);
    });
  });

  describe('deleteOne', () => {
    const dni: string = '1234567890';

    it('should delete a client', async () => {
      // Arrange
      repository.findOneAndDelete.mockResolvedValueOnce(undefined);

      // Act
      await service.deleteOne(dni);

      // Assert
      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ dni: dni });
    });
  });
});