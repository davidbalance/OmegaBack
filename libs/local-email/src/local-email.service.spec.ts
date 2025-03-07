/* eslint-disable @typescript-eslint/unbound-method */
import { ConfigService } from "@nestjs/config";
import { Mailer, MailerToken } from "./local-email.dependecy";
import { LocalEmailService } from "./local-email.service";
import { Test, TestingModule } from "@nestjs/testing";
import { EmailProviderPayload } from "@shared/shared/providers/email.provider";
import { Logger } from "@nestjs/common";
import { InternalError } from "@shared/shared/domain/error";

describe('LocalEmailService', () => {
  let service: LocalEmailService;
  let transporter: jest.Mocked<Mailer>;
  let configService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    jest.spyOn(Logger, 'error').mockImplementation(() => { });
    transporter = { sendMail: jest.fn() } as unknown as jest.Mocked<Mailer>;
    configService = { getOrThrow: jest.fn() } as unknown as jest.Mocked<ConfigService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalEmailService,
        { provide: MailerToken, useValue: transporter },
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    service = module.get<LocalEmailService>(LocalEmailService);
  });

  it('should send an email successfully', async () => {
    configService.getOrThrow.mockReturnValue({ auth_user: 'default@example.com' });
    transporter.sendMail.mockResolvedValue(undefined);

    const payload: EmailProviderPayload = {
      recipient: 'user@example.com',
      subject: 'Test Email',
      type: 'html',
      content: '<p>Hello</p>',
    };

    await service.send(payload);

    expect(transporter.sendMail).toHaveBeenCalledWith({
      from: 'default@example.com',
      to: 'user@example.com',
      subject: 'Test Email',
      html: '<p>Hello</p>',
      text: undefined,
      attachments: undefined,
    });
  });

  it('should use default sender email when `from` is not provided', async () => {
    configService.getOrThrow.mockReturnValue({ auth_user: 'default@example.com' });
    transporter.sendMail.mockResolvedValue(undefined);

    const payload: EmailProviderPayload = {
      recipient: 'user@example.com',
      subject: 'Test Email',
      type: 'text',
      content: 'Hello',
    };

    await service.send(payload);

    expect(transporter.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({ from: 'default@example.com' })
    );
  });

  it('should throw an error if sending email fails', async () => {
    configService.getOrThrow.mockReturnValue({ auth_user: 'default@example.com' });
    transporter.sendMail.mockRejectedValue(new Error('SendMail Failed'));

    const payload: EmailProviderPayload = {
      recipient: 'user@example.com',
      subject: 'Test Email',
      type: 'text',
      content: 'Hello',
    };

    await expect(service.send(payload)).rejects.toThrow(InternalError);
  });

  it('should throw an error if configuration is missing', async () => {
    configService.getOrThrow.mockImplementation(() => {
      throw new Error('Config Missing');
    });

    const payload: EmailProviderPayload = {
      recipient: 'user@example.com',
      subject: 'Test Email',
      type: 'text',
      content: 'Hello',
    };

    await expect(service.send(payload)).rejects.toThrow(InternalError);
    expect(transporter.sendMail).not.toHaveBeenCalled();
  });
});
