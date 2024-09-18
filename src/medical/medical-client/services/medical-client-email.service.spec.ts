import { TestBed } from "@automock/jest";
import { MedicalEmailRepository } from "../repositories/medical-email.repository";
import { MedicalClientEmailService } from "./medical-client-email.service";
import { MedicalClientManagementService } from "./medical-client-management.service";
import { mockMedicalEmailEntities, mockMedicalEmailEntity } from "../stub/medical-email-entity.stub";
import { PostMedicalEmailRequestDto } from "../dtos/request/medical-email.post.dto";
import { mockMedicalClientEntity } from "../stub/medical-client-entity.stub";

describe('MedicalClientEmailService', () => {
  let service: MedicalClientEmailService;
  let clientService: jest.Mocked<MedicalClientManagementService>;
  let repository: jest.Mocked<MedicalEmailRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalClientEmailService).compile();

    service = unit;
    clientService = unitRef.get(MedicalClientManagementService);
    repository = unitRef.get(MedicalEmailRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAllByDni', () => {
    it('should find all emails by DNI', async () => {
      // Arrange
      const dni = '1234567890';
      const mockedEmails = mockMedicalEmailEntities();
      repository.find.mockResolvedValue(mockedEmails);

      // Act
      const result = await service.findAllByDni(dni);

      // Assert
      expect(repository.find).toHaveBeenCalledWith({ where: { client: { dni } } });
      expect(result).toEqual(mockedEmails);
    });
  });

  describe('assignEmail', () => {
    it('should assign an email to a medical client', async () => {
      // Arrange
      const dni = '1234567890';
      const mockDto: PostMedicalEmailRequestDto = {
        email: 'john.doe@example.com'
      };
      const mockedClient = mockMedicalClientEntity();
      const mockedEmail = mockMedicalEmailEntity();
      clientService.findOneByDni.mockResolvedValue(mockedClient);
      repository.create.mockResolvedValue(mockedEmail);

      // Act
      const result = await service.assignEmail(dni, mockDto);

      // Assert
      expect(clientService.findOneByDni).toHaveBeenCalledWith(dni);
      expect(repository.create).toHaveBeenCalledWith({ ...mockDto, client: { id: mockedClient.id } });
      expect(result).toEqual(mockedEmail);
    });
  });

  describe('updateEmailDefault', () => {
    it('should update the default email', async () => {
      // Arrange
      const id = 1;
      const mockedEmail = mockMedicalEmailEntity();
      const mockedClient = mockMedicalClientEntity();
      repository.findOne.mockResolvedValue(mockedEmail);
      clientService.findOne.mockResolvedValue(mockedClient);
      repository.find.mockResolvedValue([mockedEmail]);
      repository.findOneAndUpdate.mockResolvedValue(mockedEmail);

      // Act
      const result = await service.updateEmailDefault(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id }, relations: { client: true } });
      expect(clientService.findOne).toHaveBeenCalledWith(mockedEmail.client.id);
      expect(repository.find).toHaveBeenCalledWith({ where: { client: { dni: mockedClient.dni } } });
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: mockedEmail.id }, { default: false });
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, { default: true });
      expect(result).toEqual(mockedEmail);
    });
  });

  describe('deleteOne', () => {
    it('should delete an email', async () => {
      // Arrange
      const id = 1;
      repository.findOneAndDelete.mockResolvedValue(undefined);

      // Act
      await service.deleteOne(id);

      // Assert
      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id });
    });
  });
});