/* eslint-disable @typescript-eslint/unbound-method */
import { ClientRecordRepository } from "@omega/medical/application/repository/model.repositories";
import { ClientRecordFindManyQuery, ClientRecordFindManyQueryPayload } from "../client-record-find-many.query";
import { ClientRecordModel } from "@omega/medical/core/model/client/client-record.model";

describe("ClientRecordFindManyQuery", () => {
    let repository: jest.Mocked<ClientRecordRepository>;
    let handler: ClientRecordFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<ClientRecordRepository>;

        handler = new ClientRecordFindManyQuery(repository);
    });

    it("should fetch records data without filter", async () => {
        const query: ClientRecordFindManyQueryPayload = {
            patientDni: "1234567890"
        };

        const mockData: ClientRecordModel[] = [
            { recordId: "1", recordFilepath: '/path/to/record.pdf' },
            { recordId: "2", recordFilepath: '/path/to/record.pdf' },
        ] as unknown as ClientRecordModel[];

        repository.findManyAsync.mockResolvedValue(mockData);

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            filter: [{ field: 'patientDni', operator: 'eq', value: query.patientDni }],
            order: {
                recordEmissionDate: 'desc'
            }
        });
        expect(result).toEqual(mockData);
    });

    it("should fetch records data with filter", async () => {
        const query: ClientRecordFindManyQueryPayload = {
            patientDni: "1234567890",
            filter: 'record'
        };

        const mockData: ClientRecordModel[] = [
            { recordId: "1", recordFilepath: '/path/to/record.pdf' },
            { recordId: "2", recordFilepath: '/path/to/record.pdf' },
        ] as unknown as ClientRecordModel[];

        repository.findManyAsync.mockResolvedValue(mockData);

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            filter: [
                { field: 'patientDni', operator: 'eq', value: query.patientDni },
                { field: 'recordName', operator: 'like', value: query.filter },
            ],
            order: {
                recordEmissionDate: 'desc'
            }
        });
        expect(result).toEqual(mockData);
    });

    it("should return empty array if no matching data found", async () => {
        const query: ClientRecordFindManyQueryPayload = {
            patientDni: "1234567890"
        };

        repository.findManyAsync.mockResolvedValue([]);

        const result = await handler.handleAsync(query);

        expect(result).toEqual([]);
    });
});
