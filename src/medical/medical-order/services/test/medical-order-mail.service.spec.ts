import { TestBed } from "@automock/jest";
import { MedicalOrderMailService } from "../medical-order-mail.service";
import { MailerService } from "@/shared/mailer/mailer.service";
import { ConfigService } from "@nestjs/config";
import { MedicalOrderRepository } from "../../repositories/medical-order.repository";
import { mockMedicalOrder } from "./stub/medical-order.stub";
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
    const order: number = 1;
    const mail: number = 1;
    const mockedOrder = mockMedicalOrder();
    const mockedAppTargetHost = 'http://localhost:3000';
    const mockedDirectory = path.resolve('static/images/omega.png');

    it('should send an email with the correct data', async () => {
      // Arrange
      repository.findOne.mockResolvedValueOnce(mockedOrder);
      config.get.mockReturnValueOnce(mockedAppTargetHost);
      mailer.send.mockResolvedValueOnce(undefined);

      // Act
      await service.send(order, mail);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: order },
        select: { id: true },
        relations: { client: { email: true } }
      });
      expect(config.get).toHaveBeenCalledWith('APP_TARGET_HOST');
      expect(mailer.send).toHaveBeenCalledWith({
        recipients: [{ name: `${mockedOrder.client.name} ${mockedOrder.client.lastname}`, address: mockedOrder.client.email[0].email }],
        subject: 'Resultados exámenes ocupacionales',
        placeholderReplacements: {
          patientFullname: `${mockedOrder.client.name} ${mockedOrder.client.lastname}`,
          url: `${mockedAppTargetHost}/order/${order}`
        },
        attachments: [
          {
            filename: 'omega.png',
            path: mockedDirectory,
            cid: 'logo'
          }
        ]
      });
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: order }, { mailStatus: true });
    });

    it('should update the mailStatus to false if the email fails to send', async () => {
      // Arrange
      repository.findOne.mockResolvedValueOnce(mockedOrder);
      config.get.mockReturnValueOnce(mockedAppTargetHost);
      mailer.send.mockRejectedValueOnce(new Error('Failed to send email'));

      // Act
      try {
        await service.send(order, mail);
      } catch (error) {
        // Assert
        expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: order }, { mailStatus: false });
      }
    });
  });
});