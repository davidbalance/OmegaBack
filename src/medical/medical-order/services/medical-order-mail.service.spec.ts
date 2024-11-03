import { MailerService } from "@/shared/mailer/mailer.service";
import { MedicalOrderRepository } from "../repositories/medical-order.repository";
import { MedicalOrderMailService } from "./medical-order-mail.service";
import { ConfigService } from "@nestjs/config";
import { TestBed } from "@automock/jest";
import { mockMedicalOrderEntity } from "../stubs/medical-order-entity.stub";
import { NestPath } from "@/shared/nest-ext/nest-path/nest-path.type";
import { HandlebarsService } from "@/shared/handlebars/handlebars.service";
import { NEST_PATH } from "@/shared/nest-ext/nest-path/inject-token";
import { ServerConfig, ServerConfigName } from "@/shared/config/server.config";

describe('MedicalOrderMailService', () => {
  let service: MedicalOrderMailService;
  let repository: jest.Mocked<MedicalOrderRepository>;
  let mailer: jest.Mocked<MailerService>;
  let config: jest.Mocked<ConfigService>;
  let path: jest.Mocked<NestPath>;
  let handlebars: jest.Mocked<HandlebarsService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalOrderMailService).compile();

    service = unit;
    repository: unitRef.get(MedicalOrderRepository);
    mailer: unitRef.get(MailerService);
    config: unitRef.get(ConfigService);
    path: unitRef.get(NEST_PATH);
    handlebars: unitRef.get(HandlebarsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('send', () => {
    const order = 1;
    const mail = 1;
    const mockedOrder = mockMedicalOrderEntity();
    const targetHost = 'https://example.com';
    const templateDelegate = jest.fn().mockReturnValue('Test content');

    beforeEach(() => {
      config.get.mockReturnValue({ app_client: targetHost } as ServerConfig);
    });

    it('should send an email', async () => {
      // Arrange
      path.resolve.mockReturnValue('/path/to/file.png');
      repository.findOne.mockResolvedValue(mockedOrder);
      handlebars.loadTemplate.mockReturnValue(templateDelegate);
      mailer.send.mockResolvedValue(undefined);

      // Act
      await service.send(order, mail);

      // Assert
      expect(config.get).toHaveBeenCalledWith(ServerConfigName);
      expect(path.resolve).toHaveBeenCalledWith('static/images/omega.png');
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: order },
        select: { id: true },
        relations: { client: { email: true } },
      });
      expect(templateDelegate).toHaveBeenCalledWith({
        patientFullName: `${mockedOrder.client.name} ${mockedOrder.client.lastname}`,
        url: `${targetHost}/order/${order}`
      });
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
      repository.findOne.mockResolvedValue(mockedOrder);
      handlebars.loadTemplate.mockReturnValue(templateDelegate);
      mailer.send.mockRejectedValue(new Error());

      // Act
      await expect(service.send(order, mail)).rejects.toThrow();

      // Assert
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: order }, { mailStatus: false });
    });
  });
});