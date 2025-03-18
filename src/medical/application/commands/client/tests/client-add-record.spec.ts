/* eslint-disable @typescript-eslint/unbound-method */
import { Client } from "@omega/medical/core/domain/client/client.domain";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { ClientAddRecordCommand, ClientAddRecordCommandPayload } from "../client-add-record.command";
import { ClientRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { PdfProvider } from "@shared/shared/providers/pdf.provider";
import { FileOperation, IncrementProvider } from "@shared/shared/providers";

describe("ClientAddRecordCommand", () => {
    let repository: jest.Mocked<ClientRepository>;
    let pdf: jest.Mocked<PdfProvider>;
    let file: jest.Mocked<FileOperation>;
    let increment: jest.Mocked<IncrementProvider>;
    let layoutHelper: jest.Mock;
    let filenameHelper: jest.Mock;
    let handler: ClientAddRecordCommand;

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
            write: jest.fn(),
        } as unknown as jest.Mocked<FileOperation>;

        layoutHelper = jest.fn().mockReturnValue({});
        filenameHelper = jest.fn().mockReturnValue("report.pdf");

        handler = new ClientAddRecordCommand(repository, pdf, file, layoutHelper, filenameHelper, increment);
    });

    it("should add a record to the client when client exists", async () => {
        const mockClient = {
            patientDni: '1234567890001',
            patientName: 'Test name',
            patientLastname: 'Test lastname',
            addRecord: jest.fn(),
        } as unknown as Client;

        const mockedNext: number = 0;
        const mockFile = Buffer.from('Test pdf');

        repository.findOneAsync.mockResolvedValue(mockClient);
        increment.next.mockResolvedValue(mockedNext);
        pdf.craft.mockResolvedValue(mockFile);
        file.write.mockResolvedValue('/path/to/report.pdf');
        repository.saveAsync.mockResolvedValue();

        const payload: ClientAddRecordCommandPayload = {
            patientDni: "12345678",
            type: 'inicial',
        } as unknown as ClientAddRecordCommandPayload;

        const expectedFilepath = `medical_record/${mockClient.patientDni}_${`${mockClient.patientName} ${mockClient.patientLastname}`.toLowerCase().replaceAll(' ', '_')}`;

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "patientDni", operator: "eq", value: payload.patientDni }],
        });
        expect(increment.next).toHaveBeenCalledWith('clinic-history');
        expect(increment.next).toHaveBeenCalledWith(payload.type);
        expect(layoutHelper).toHaveBeenCalledWith(payload, mockedNext, mockedNext);
        expect(pdf.craft).toHaveBeenCalledWith({});
        expect(filenameHelper).toHaveBeenCalledWith(payload.type);
        expect(file.write).toHaveBeenCalledWith(expectedFilepath, "report.pdf", mockFile);
        expect(mockClient.addRecord).toHaveBeenCalledWith({ filepath: '/path/to/report.pdf', name: payload.type });
        expect(repository.saveAsync).toHaveBeenCalledWith(mockClient);
    });

    it("should throw ClientNotFoundError when client does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: ClientAddRecordCommandPayload = {
            patientDni: "12345678",
            type: 'inicial',
        } as unknown as ClientAddRecordCommandPayload;

        await expect(handler.handleAsync(payload)).rejects.toThrow(ClientNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "patientDni", operator: "eq", value: payload.patientDni }],
        });
        expect(increment.next).not.toHaveBeenCalled();
        expect(layoutHelper).not.toHaveBeenCalled();
        expect(pdf.craft).not.toHaveBeenCalled();
        expect(filenameHelper).not.toHaveBeenCalled();
        expect(file.write).not.toHaveBeenCalled();
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
