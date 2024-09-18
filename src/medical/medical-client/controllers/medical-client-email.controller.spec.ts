import { TestBed } from "@automock/jest";
import { MedicalClientEmailService } from "../services/medical-client-email.service";
import { MedicalClientEmailController } from "./medical-client-email.controller";
import { mockMedicalEmails } from "../stub/medical-email.stub";
import { PostMedicalEmailRequestDto } from "../dtos/request/medical-email.post.dto";

describe('MedicalClientEmailController', () => {
  let controller: MedicalClientEmailController;
  let service: jest.Mocked<MedicalClientEmailService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalClientEmailController).compile();

    controller = unit;
    service = unitRef.get(MedicalClientEmailService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAllByDni', () => {
    it('should find all emails by DNI', async () => {
      // Arrange
      const dni = '1234567890';
      const mockedEmails = mockMedicalEmails();
      service.findAllByDni.mockResolvedValue(mockedEmails);

      // Act
      const result = await controller.findAllByDni(dni);

      // Assert
      expect(service.findAllByDni).toHaveBeenCalledWith(dni);
      expect(result).toEqual({ data: mockedEmails });
    });
  });

  describe('createEmail', () => {
    it('should create an email', async () => {
      // Arrange
      const dni = '1234567890';
      const mockDto: PostMedicalEmailRequestDto = {
        email: 'test@example.com',
      };
      service.assignEmail.mockResolvedValue(undefined);

      // Act
      const result = await controller.createEmail(dni, mockDto);

      // Assert
      expect(service.assignEmail).toHaveBeenCalledWith(dni, mockDto);
      expect(result).toEqual({});
    });
  });

  describe('updateEmailDefault', () => {
    it('should update the default email', async () => {
      // Arrange
      const id = 1;
      service.updateEmailDefault.mockResolvedValue(undefined);

      // Act
      const result = await controller.updateEmailDefault(id);

      // Assert
      expect(service.updateEmailDefault).toHaveBeenCalledWith(id);
      expect(result).toEqual({});
    });
  });

  describe('deleteOne', () => {
    it('should delete an email', async () => {
      // Arrange
      const id = 1;
      service.deleteOne.mockResolvedValue(undefined);

      // Act
      const result = await controller.deleteOne(id);

      // Assert
      expect(service.deleteOne).toHaveBeenCalledWith(id);
      expect(result).toEqual({});
    });
  });
});
