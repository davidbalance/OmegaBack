import { MailerService } from "@/shared/mailer/mailer.service";
import { MedicalOrderRepository } from "../repositories/medical-order.repository";
import { MedicalOrderMailService } from "./medical-order-mail.service";
import { ConfigService } from "@nestjs/config";
import { TestBed } from "@automock/jest";
import { mockMedicalOrderEntity } from "../stubs/medical-order-entity.stub";
import path from "path";

describe('MedicalOrderMailService', () => {
  let service: MedicalOrderMailService;
  let repository: jest.Mocked<MedicalOrderRepository>;
  let mailer: jest.Mocked<MailerService>;
  let config: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalOrderMailService).compile();

    service = unit;
    repository = unitRef.get(MedicalOrderRepository);
    mailer = unitRef.get(MailerService);
    config = unitRef.get(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('send', () => {
    it('should send an email', async () => {
      // Arrange
      const order = 1;
      const mail = 1;
      const mockedOrder = mockMedicalOrderEntity();
      const targetHost = 'https://example.com';
      repository.findOne.mockResolvedValue(mockedOrder);
      config.get.mockReturnValue(targetHost);
      mailer.send.mockResolvedValue(undefined);

      // Act
      await service.send(order, mail);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: order },
        select: { id: true },
        relations: { client: { email: true } },
      });
      expect(config.get).toHaveBeenCalledWith('APP_TARGET_HOST');
      expect(mailer.send).toHaveBeenCalledWith({
        recipients: [{ name: `${mockedOrder.client.name} ${mockedOrder.client.lastname}`, address: mockedOrder.client.email[0].email }],
        subject: 'Resultados exámenes ocupacionales',
        placeholderReplacements: {
          patientFullname: `${mockedOrder.client.name} ${mockedOrder.client.lastname}`,
          url: `${targetHost}/order/${order}`,
        },
        attachments: [
          {
            filename: 'omega.png',
            path: path.join(path.resolve('static', 'images/omega.png')),
            cid: 'logo',
          },
        ],
      });
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: order }, { mailStatus: true });
    });

    it('should handle errors and update mail status', async () => {
      // Arrange
      const order = 1;
      const mail = 1;
      const mockedOrder = mockMedicalOrderEntity();
      repository.findOne.mockResolvedValue(mockedOrder);
      mailer.send.mockRejectedValue(new Error());

      // Act
      await expect(service.send(order, mail)).rejects.toThrow();

      // Assert
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: order }, { mailStatus: false });
    });
  });
});