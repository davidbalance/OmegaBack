import { TestBed } from "@automock/jest";
import { MedicalClientEmailService } from "../services/medical-client-email.service";
import { MedicalClientEmailController } from "./medical-client-email.controller";
import { MedicalEmail } from "../entities/medical-email.entity";
import { mockMedicalEmail, mockMedicalEmails } from "../services/test/stub/medical-email.stub";
import { GetMedicalEmailArrayResponseDto } from "../dtos/response/get.medical-email-array.response.dto";
import { PostMedicalEmailRequestDto } from "../dtos/request/post.medical-email.request.dto";
import { PostMedicalEmailResponseDto } from "../dtos/response/post.medical-email.response.dto";
import { GetMedicalEmailResponseDto } from "../dtos/response/get.medical-email.response.dto";

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
    const dni: string = '1234567890';
    const mockedEmails: MedicalEmail[] = mockMedicalEmails();
    const expectedResult: GetMedicalEmailArrayResponseDto = { data: mockedEmails };

    it('should return all emails by dni', async () => {
      // Arrange
      service.findAllByDni.mockResolvedValueOnce(mockedEmails);

      // Act
      const result = await controller.findAllByDni(dni);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.findAllByDni).toHaveBeenCalledWith(dni);
    });
  });

  describe('createEmail', () => {
    const dni: string = '1234567890';
    const body: PostMedicalEmailRequestDto = {
      email: 'test@example.com'
    };
    const mockedEmail = mockMedicalEmail();
    const expectedResult: PostMedicalEmailResponseDto = mockedEmail;

    it('should create a new email', async () => {
      // Arrange
      service.assignEmail.mockResolvedValueOnce(mockedEmail);

      // Act
      const result = await controller.createEmail(dni, body);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.assignEmail).toHaveBeenCalledWith(dni, body);
    });
  });

  describe('updateEmailDefault', () => {
    const id: number = 1;
    const mockedEmail = mockMedicalEmail();
    const expectedResult: GetMedicalEmailResponseDto = mockedEmail;

    it('should update the default email', async () => {
      // Arrange
      service.updateEmailDefault.mockResolvedValueOnce(mockedEmail);

      // Act
      const result = await controller.updateEmailDefault(id);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.updateEmailDefault).toHaveBeenCalledWith(id);
    });
  });

  describe('deleteOne', () => {
    const id: number = 1;

    it('should delete an email', async () => {
      // Arrange
      service.deleteOne.mockResolvedValueOnce(undefined);

      // Act
      await controller.deleteOne(id);

      // Assert
      expect(service.deleteOne).toHaveBeenCalledWith(id);
    });
  });

});