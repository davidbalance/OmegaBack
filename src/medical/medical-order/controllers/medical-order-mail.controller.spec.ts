import { TestBed } from "@automock/jest";
import { MedicalOrderMailService } from "../services/medical-order-mail.service";
import { MedicalOrderMailController } from "./medical-order-mail.controller";
import { PostMedicalOrderMailRequestDto } from "../dtos/request/post.medical-order-mail.request.dto";

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
    const body: PostMedicalOrderMailRequestDto = {
      order: 1,
      mail: 1
    };
    const expectResult = { message: "ok" };

    it('should send an email', async () => {
      // Arrange
      service.send.mockResolvedValueOnce(undefined);

      // Act
      const result = await controller.sendEmail(body);

      // Assert
      expect(result).toEqual(expectResult);
      expect(service.send).toHaveBeenCalledWith(body.order, body.mail);
    });
  });
});