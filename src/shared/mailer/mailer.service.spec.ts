import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import { MailerService } from './mailer.service';
import { MailerModuleOptions, MailerSender } from './mailer.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { MODULE_OPTIONS_TOKEN } from './mailer.module-definition';
import path from 'path';

jest.mock('nodemailer');
jest.mock('handlebars');
jest.mock('fs');

describe('MailerService', () => {
    let service: MailerService;
    const mockOptions: MailerModuleOptions = {
        template: {
            name: 'template.hbs',
            path: path.resolve('templates/mail/mail.hbs')
        },
        server: {
            host: 'test-host.com',
            port: 1234,
            secure: false
        },
        auth: {
            user: 'test-user',
            password: 'test-password'
        },
        default: undefined
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MailerService,
                { provide: MODULE_OPTIONS_TOKEN, useValue: mockOptions },
            ],
        }).compile();

        service = module.get<MailerService>(MailerService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a mail transporter', () => {
        // Arrange
        const createTransportMock = jest.spyOn(nodemailer, 'createTransport').mockReturnValue({
            sendMail: jest.fn(),
        } as any);

        // Act
        const transporter = service['mailTransporter']();

        // Assert
        expect(createTransportMock).toHaveBeenCalledWith({
            host: mockOptions.server.host,
            port: mockOptions.server.port,
            secure: mockOptions.server.secure,
            auth: {
                user: mockOptions.auth.user,
                pass: mockOptions.auth.password,
            },
        });
        expect(transporter).toBeDefined();
    });

    it('should load and compile the email template', () => {
        // Arrange
        const templateSource = '<html><body>{{name}}</body></html>';
        jest.spyOn(fs, 'readFileSync').mockReturnValue(templateSource);
        const compileMock = jest.spyOn(handlebars, 'compile').mockReturnValue(() => 'Compiled template');

        // Act
        const compiledTemplate = service['loadTemplate']()

        // Assert
        expect(fs.readFileSync).toHaveBeenCalledWith(expect.stringContaining('.hbs'), 'utf-8');
        expect(compileMock).toHaveBeenCalledWith(templateSource);
        expect(compiledTemplate).toBeDefined();
    });

    it('should send an email with the correct options', async () => {
        // Arrange
        const sendMailMock = jest.fn().mockResolvedValue('Email sent');
        jest.spyOn(nodemailer, 'createTransport').mockReturnValue({ sendMail: sendMailMock } as any);
        jest.spyOn(service as any, 'loadTemplate').mockReturnValue(() => 'Compiled template');

        const options: MailerSender = {
            recipients: [{ address: 'test@recipient.com', name: 'Testing user' }],
            subject: 'Test Email',
            placeholderReplacements: { name: 'Test User' },
            attachments: [],
        };

        // Act
        const result = await service.send(options);

        // Assert
        expect(sendMailMock).toHaveBeenCalledWith({
            from: options.from,
            to: options.recipients,
            subject: options.subject,
            html: 'Compiled template',
            attachments: options.attachments,
        });
        expect(result).toBe('Email sent');
    });

    it('should log and rethrow errors during email sending', async () => {
        // Arrange
        const sendMailMock = jest.fn().mockRejectedValue(new Error('Send mail failed'));
        jest.spyOn(nodemailer, 'createTransport').mockReturnValue({ sendMail: sendMailMock } as any);

        const options: MailerSender = {
            recipients: [{ address: 'test@recipient.com', name: 'Testing user' }],
            subject: 'Test Email',
            placeholderReplacements: { name: 'Test User' },
            attachments: [],
        };

        // Act & Assert
        await expect(service.send(options)).rejects.toThrowError(Error);

        expect(sendMailMock).toHaveBeenCalled();
    });

});