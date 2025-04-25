/* eslint-disable @typescript-eslint/unbound-method */
import { ClientEmailFindManyQuery, ClientEmailFindManyQueryImpl, ClientEmailFindManyQueryPayload } from "../client-email-find-many.query";
import { ClientEmailModel } from "@omega/medical/core/model/client/client-email.model";
import { ClientEmailRepository } from "@omega/medical/application/repository/model.repositories";

describe("ClientEmailFindManyQuery", () => {
    let repository: jest.Mocked<ClientEmailRepository>;
    let handler: ClientEmailFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<ClientEmailRepository>;

        handler = new ClientEmailFindManyQueryImpl(repository);
    });

    it("should return a list of client emails when patientDni matches", async () => {
        const mockClients: ClientEmailModel[] = [
            { patientDni: "12345678", email: "test1@example.com" } as unknown as ClientEmailModel,
            { patientDni: "12345678", email: "test2@example.com" } as unknown as ClientEmailModel,
        ];

        repository.findManyAsync.mockResolvedValue(mockClients);

        const payload: ClientEmailFindManyQueryPayload = {
            patientDni: "12345678",
        };

        const result = await handler.handleAsync(payload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            filter: [{ field: "patientDni", operator: "eq", value: payload.patientDni }],
        });
        expect(result).toBe(mockClients);
    });

    it("should return an empty list if no emails are found for the given patientDni", async () => {
        repository.findManyAsync.mockResolvedValue([]);

        const payload: ClientEmailFindManyQueryPayload = {
            patientDni: "00000000",
        };

        const result = await handler.handleAsync(payload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            filter: [{ field: "patientDni", operator: "eq", value: payload.patientDni }],
        });
        expect(result).toEqual([]);
    });
});
