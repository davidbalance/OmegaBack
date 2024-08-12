import { TestBed } from "@automock/jest";
import { MedicalEmailRepository } from "../../repositories/medical-email.repository";
import { MedicalClientEmailService } from "../medical-client-email.service";
import { MedicalClientManagementService } from "../medical-client-management.service";
import { mockMedicalEmail, mockMedicalEmails } from "./stub/medical-email.stub";
import { MedicalEmail } from "../../entities/medical-email.entity";
import { PostMedicalEmailRequestDto } from "../../dtos/request/post.medical-email.request.dto";
import { mockMedicalClient } from "./stub/medical-client.stub";

describe('MedicalClientEmailService', () => {
  let service: MedicalClientEmailService;
  let repository: jest.Mocked<MedicalEmailRepository>;
  let clientService: jest.Mocked<MedicalClientManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalClientEmailService).compile();

    service = unit;
    repository = unitRef.get(MedicalEmailRepository);
    clientService = unitRef.get(MedicalClientManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAllByDni', () => {
    const dni: string = '1234567890';
    const mockedEmails = mockMedicalEmails();
    const expectResult: MedicalEmail[] = mockedEmails;

    it('should return all emails by dni', async () => {
      // Arrange
      repository.find.mockResolvedValueOnce(mockedEmails);

      // Act
      const result = await service.findAllByDni(dni);

      // Assert
      expect(result).toEqual(expectResult);
      expect(repository.find).toHaveBeenCalledWith({ where: { client: { dni } } });
    });
  });

  describe('assignEmail', () => {
    const dni: string = '12345678A';
    const body: PostMedicalEmailRequestDto = {
      email: 'test@example.com'
    };
    const mockedEmail = mockMedicalEmail();
    const mockedClient = mockMedicalClient();
    const expectResult = mockedEmail;

    it('should create a new email', async () => {
      // Arrange
      clientService.findOneByDni.mockResolvedValueOnce(mockedClient);
      repository.create.mockResolvedValueOnce(mockedEmail);

      // Act
      const result = await service.assignEmail(dni, body);

      // Assert
      expect(result).toEqual(expectResult);
      expect(clientService.findOneByDni).toHaveBeenCalledWith(dni);
      expect(repository.create).toHaveBeenCalledWith({ ...body, client: mockedClient });
    });
  });

  describe('updateEmailDefault', () => {
    const id: number = 1;
    const mockedClient = mockMedicalClient();
    const mockedEmail = mockMedicalEmail();
    const expectResult = mockedEmail;

    it('should update the default email', async () => {
      // Arrange
      repository.findOne.mockResolvedValueOnce({ ...mockedEmail, client: mockedClient });
      clientService.findOne.mockResolvedValueOnce(mockedClient);
      repository.findOneAndUpdate.mockResolvedValue(mockedEmail);

      // Act
      const result = await service.updateEmailDefault(id);

      // Assert
      expect(result).toEqual(expectResult);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id }, relations: { client: true } });
      expect(clientService.findOne).toHaveBeenCalledWith(mockedClient.id);
      expect(repository.findOneAndUpdate).toHaveBeenCalledTimes(mockedClient.email.length + 1);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: mockedEmail.id }, { default: true });
    });
  });

  describe('deleteOne', () => {
    const id: number = 1;

    it('should delete an email', async () => {
      // Arrange
      repository.findOneAndDelete.mockResolvedValueOnce(undefined);

      // Act
      await service.deleteOne(id);

      // Assert
      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id: id });
    });
  });
});