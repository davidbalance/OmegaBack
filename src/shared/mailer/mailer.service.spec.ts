import { MailerService } from './mailer.service';
import { MailerModuleOptions, MailerSender } from './mailer.interface';
import { MODULE_OPTIONS_TOKEN } from './mailer.module-definition';
import { TestBed } from '@automock/jest';
import { NestNodemailerModule } from '../nest-ext/nest-nodemailer/nest-nodemailer.module';
import Mail from 'nodemailer/lib/mailer';
import { NEST_NODEMAILER } from '../nest-ext/nest-nodemailer/inject-token';

jest.mock('nodemailer');
jest.mock('handlebars');
jest.mock('fs');

describe('MailerService', () => {
    let service: MailerService;
    const mockSendMail = jest.fn();

    const mockOptions: MailerModuleOptions = {
        auth_user: 'test@email.com',
        auth_password: 'test-password',
        default_name: 'dafault@email.com',
        default_address: 'default@email.com',
        server_host: 'smpt://sample-host.com',
        server_port: 465,
        server_secure: true
    };

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MailerService)
            .mock(MODULE_OPTIONS_TOKEN)
            .using(mockOptions)
            .mock(NEST_NODEMAILER)
            .using({
                createTransport: jest.fn().mockReturnValue({
                    sendMail: mockSendMail
                })
            })
            .compile();


        service = unit;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('send', () => {
        const sender: MailerSender = {
            recipients: [{ address: 'test@recipient.com', name: 'Testing user' }],
            subject: 'Test Email',
            content: "Test content"
        };
        const expectedOptions: Mail.Options = {
            from: mockOptions.auth_user,
            to: sender.recipients,
            subject: sender.subject,
            html: sender.content,
            attachments: undefined
        }

        it('should send an email with the correct options', async () => {
            // Arrange
            mockSendMail.mockResolvedValue('Email sent');

            // Act
            const result = await service.send(sender);

            // Assert
            expect(mockSendMail).toHaveBeenCalledWith(expectedOptions);
            expect(result).toBe('Email sent');
        });

        it('should log and rethrow errors during email sending', async () => {
            // Arrange
            mockSendMail.mockResolvedValue(new Error('Send mail failed'));

            // Act & Assert
            await expect(service.send(sender)).rejects.toThrowError(Error);
            expect(mockSendMail).toHaveBeenCalledWith(expectedOptions);
        });
    })

});