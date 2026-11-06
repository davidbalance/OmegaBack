/* eslint-disable @typescript-eslint/unbound-method */
import { Client } from "@omega/medical/core/domain/client/client.domain";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { ClientRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { PdfProvider } from "@shared/shared/providers/pdf.provider";
import { FileOperation, IncrementProvider } from "@shared/shared/providers";
import { ClientCompleteRecordCommand, ClientCompleteRecordCommandImpl, ClientCompleteRecordCommandPayload, RECORD_ROOT_PATH } from "../client-complete-record.command";
import { RecordInvalidRecordTemplate, RecordNotFoundError } from "@omega/medical/core/domain/client/errors/record.errors";

describe("ClientCompleteRecordCommand", () => {
    let repository: jest.Mocked<ClientRepository>;
    let pdf: jest.Mocked<PdfProvider>;
    let file: jest.Mocked<FileOperation>;
    let increment: jest.Mocked<IncrementProvider>;
    let filenameHelper: jest.Mock;
    let metadataHelper: jest.Mock;
    let handler: ClientCompleteRecordCommand;

    const template = {
        "certificado": Buffer.from("Hello World")
    }

    beforeEach(() => {

        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<ClientRepository>;

        pdf = {
            craft: jest.fn(),
        } as unknown as jest.Mocked<PdfProvider>;

        increment = {
            next: jest.fn(),
        } as unknown as jest.Mocked<IncrementProvider>;

        file = {
            write: jest.fn()
        } as unknown as jest.Mocked<FileOperation>;

        filenameHelper = jest.fn().mockReturnValue("record.pdf");
        metadataHelper = jest.fn().mockReturnValue({ "some": "value" })

        handler = new ClientCompleteRecordCommandImpl(template, pdf, file, increment, filenameHelper, repository, metadataHelper);
    });

    it("should add a record to the client when client exists", async () => {
        const recordId: string = "test-123";

        const mockClient = {
            patientDni: '1234567890001',
            patientName: 'Test name',
            patientLastname: 'Test lastname',
            updateRecordMetadata: jest.fn(),
            completeRecord: jest.fn(),
            records: [{ id: recordId, metadata: {} }]
        } as unknown as Client;

        const mockedNext: number = 0;
        const mockFile = Buffer.from('Test pdf');

        repository.findOneAsync.mockResolvedValue(mockClient);
        increment.next.mockResolvedValue(mockedNext);
        pdf.craft.mockResolvedValue(mockFile);
        file.write.mockResolvedValue('/path/to/record.pdf');
        repository.saveAsync.mockResolvedValue();

        const payload: ClientCompleteRecordCommandPayload = {
            recordId: recordId,
            patientDni: "12345678",
            type: 'certificado',
            metadata: {}
        } satisfies ClientCompleteRecordCommandPayload;

        const expectedFilepath = `${RECORD_ROOT_PATH}/${mockClient.patientDni}_${`${mockClient.patientName} ${mockClient.patientLastname}`.toLowerCase().replaceAll(' ', '_')}`;

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "patientDni", operator: "eq", value: payload.patientDni }],
        });
        expect(metadataHelper).toHaveBeenCalled()
        expect(increment.next).toHaveBeenCalledWith(payload.type);
        expect(pdf.craft).toHaveBeenCalled();
        expect(filenameHelper).toHaveBeenCalledWith(payload.type);
        expect(file.write).toHaveBeenCalledWith(expectedFilepath, "record.pdf", mockFile);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockClient);
    });

    it("should throw ClientNotFoundError when client does not exist", async () => {
        const recordId: string = "test-123";

        repository.findOneAsync.mockResolvedValue(null);

        const payload: ClientCompleteRecordCommandPayload = {
            recordId: recordId,
            patientDni: "12345678",
            type: 'certificado',
            metadata: {},
        } satisfies ClientCompleteRecordCommandPayload;

        await expect(handler.handleAsync(payload)).rejects.toThrow(ClientNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "patientDni", operator: "eq", value: payload.patientDni }],
        });
        expect(metadataHelper).not.toHaveBeenCalled()
        expect(increment.next).not.toHaveBeenCalled();
        expect(pdf.craft).not.toHaveBeenCalled();
        expect(filenameHelper).not.toHaveBeenCalled();
        expect(file.write).not.toHaveBeenCalled();
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });

    it("should throw RecordInvalidRecordTemplate when template is not registered", async () => {
        const recordId: string = "test-123";

        const mockClient = {
            patientDni: '1234567890001',
            patientName: 'Test name',
            patientLastname: 'Test lastname',
            updateRecordMetadata: jest.fn(),
            completeRecord: jest.fn(),
            record: [{ id: recordId, metadata: {} }]
        } as unknown as Client;

        repository.findOneAsync.mockResolvedValue(mockClient);

        const payload: ClientCompleteRecordCommandPayload = {
            recordId: recordId,
            patientDni: "12345678",
            type: 'invalid',
            metadata: {}
        } satisfies ClientCompleteRecordCommandPayload;

        await expect(handler.handleAsync(payload)).rejects.toThrow(RecordInvalidRecordTemplate);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "patientDni", operator: "eq", value: payload.patientDni }],
        });
        expect(metadataHelper).not.toHaveBeenCalled()
        expect(increment.next).not.toHaveBeenCalled();
        expect(pdf.craft).not.toHaveBeenCalled();
        expect(filenameHelper).not.toHaveBeenCalled();
        expect(file.write).not.toHaveBeenCalled();
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });

    it("should throw RecordNotFoundError when record is not asigned to the client", async () => {
        const recordId: string = "test-123";

        const mockClient = {
            patientDni: '1234567890001',
            patientName: 'Test name',
            patientLastname: 'Test lastname',
            updateRecordMetadata: jest.fn(),
            completeRecord: jest.fn(),
            record: [{ id: recordId, metadata: {} }]
        } as unknown as Client;

        repository.findOneAsync.mockResolvedValue(mockClient);

        const payload: ClientCompleteRecordCommandPayload = {
            recordId: "invalid-record",
            patientDni: "12345678",
            type: 'invalid',
            metadata: {}
        } satisfies ClientCompleteRecordCommandPayload;

        await expect(handler.handleAsync(payload)).rejects.toThrow(RecordInvalidRecordTemplate);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "patientDni", operator: "eq", value: payload.patientDni }],
        });
        expect(metadataHelper).not.toHaveBeenCalled()
        expect(increment.next).not.toHaveBeenCalled();
        expect(pdf.craft).not.toHaveBeenCalled();
        expect(filenameHelper).not.toHaveBeenCalled();
        expect(file.write).not.toHaveBeenCalled();
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
