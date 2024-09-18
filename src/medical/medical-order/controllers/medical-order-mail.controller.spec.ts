import { TestBed } from "@automock/jest";
import { MedicalOrderMailService } from "../services/medical-order-mail.service";
import { MedicalOrderMailController } from "./medical-order-mail.controller";
import { PostMedicalOrderMailRequestDto } from "../dtos/request/medical-order-mail.post.dto";

describe('MedicalOrderMailController', () => {
  let controller: MedicalOrderMailController;
  let service: jest.Mocked<MedicalOrderMailService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalOrderMailController).compile();

    controller = unit;
    service = unitRef.get(MedicalOrderMailService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sendEmail', () => {
    it('should send an email', async () => {
      // Arrange
      const mockDto: PostMedicalOrderMailRequestDto = {
        order: 1,
        mail: 1,
      };
      service.send.mockResolvedValue(undefined);

      // Act
      const result = await controller.sendEmail(mockDto);

      // Assert
      expect(service.send).toHaveBeenCalledWith(mockDto.order, mockDto.mail);
      expect(result).toEqual({ message: 'ok' });
    });
  });
});
