/* eslint-disable @typescript-eslint/unbound-method */
import { OrderNotFoundError } from "@omega/medical/core/domain/order/errors/order.errors";
import { OrderProps, Order } from "@omega/medical/core/domain/order/order.domain";
import { AggregateRepository } from "@shared/shared/providers";
import { EmailAttachment, EmailProvider } from "@shared/shared/providers/email.provider";
import { OrderSendMailCommand, OrderSendMailCommandPayload } from "../order-send-mail.command";
import { HtmlLoaderProvider } from "@shared/shared/providers/html-loader.provider";
import { OrderPatientRepository } from "@omega/medical/application/repository/model.repositories";
import { OrderPatientModel } from "@omega/medical/core/model/order/order-patient.model";

describe("OrderSendMailCommand", () => {
    let repository: jest.Mocked<AggregateRepository<OrderProps, Order>>;
    let emailEmitter: jest.Mocked<EmailProvider>;
    let layout: jest.MockedFunction<HtmlLoaderProvider<{ url: string, patientFullname: string }>>;
    let handler: OrderSendMailCommand;
    let attachment: EmailAttachment[];
    let redirectURL: string;
    let modelRepository: jest.Mocked<OrderPatientRepository>;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<AggregateRepository<OrderProps, Order>>;

        emailEmitter = {
            send: jest.fn(),
        } as unknown as jest.Mocked<EmailProvider>;

        layout = jest.fn();
        attachment = [{
            cid: 'logo',
            filename: 'static/images/omega.png',
            path: 'omega.png'
        }];

        redirectURL = "http://test.com";

        modelRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<OrderPatientRepository>;

        handler = new OrderSendMailCommand(repository, emailEmitter, layout, attachment, redirectURL, modelRepository);
    });

    it("should send an email when order exists", async () => {
        const mockOrder = {
            id: "order-id-123",
            sendMail: jest.fn(),
        } as unknown as Order;

        const mockedModel = {
            patientName: 'Test',
            patientLastname: 'Test'
        } as unknown as OrderPatientModel;

        repository.findOneAsync.mockResolvedValue(mockOrder);
        modelRepository.findOneAsync.mockResolvedValue(mockedModel);
        layout.mockReturnValue("email-content");

        const payload: OrderSendMailCommandPayload = {
            orderId: "order-id-123",
            email: "customer@example.com",
        };

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.orderId }],
        });
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([{ field: 'orderId', operator: 'eq', value: payload.orderId }]);
        expect(layout).toHaveBeenCalledWith({ url: `${redirectURL}/${mockOrder.id}`, patientFullname: `${mockedModel.patientName} ${mockedModel.patientLastname}` })
        expect(emailEmitter.send).toHaveBeenCalledWith({
            recipient: payload.email,
            content: "email-content",
            subject: "Resultados Ocupacionales",
            type: "html",
            attachments: attachment,
        });
        expect(mockOrder.sendMail).toHaveBeenCalled();
        expect(repository.saveAsync).toHaveBeenCalledWith(mockOrder);
    });

    it("should throw OrderNotFoundError when order does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: OrderSendMailCommandPayload = {
            orderId: "order-id-123",
            email: "customer@example.com",
        };

        await expect(handler.handleAsync(payload)).rejects.toThrow(
            new OrderNotFoundError(payload.orderId)
        );

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.orderId }],
        });
        expect(modelRepository.findOneAsync).not.toHaveBeenCalled();
        expect(layout).not.toHaveBeenCalled();
        expect(emailEmitter.send).not.toHaveBeenCalled();
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });

    it("should throw OrderNotFoundError when order does not exist", async () => {
        const mockOrder = {
            id: "order-id-123",
            sendMail: jest.fn(),
        } as unknown as Order;

        repository.findOneAsync.mockResolvedValue(mockOrder);
        modelRepository.findOneAsync.mockResolvedValue(null);

        const payload: OrderSendMailCommandPayload = {
            orderId: "order-id-123",
            email: "customer@example.com",
        };

        await expect(handler.handleAsync(payload)).rejects.toThrow(
            new OrderNotFoundError(payload.orderId)
        );

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.orderId }],
        });
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([{ field: 'orderId', operator: 'eq', value: payload.orderId }]);
        expect(layout).not.toHaveBeenCalled();
        expect(emailEmitter.send).not.toHaveBeenCalled();
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});