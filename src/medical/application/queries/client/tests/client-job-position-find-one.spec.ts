/* eslint-disable @typescript-eslint/unbound-method */
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { ClientJobPositionModel } from "@omega/medical/core/model/client/client-job-position.model";
import { ModelRepository } from "@shared/shared/providers";
import { ClientJobPositionFindOneQuery, ClientJobPositionFindOneQueryPayload } from "../client-job-position-find-one.query";

describe("ClientJobPositionFindOneQuery", () => {
    let repository: jest.Mocked<ModelRepository<ClientJobPositionModel>>;
    let handler: ClientJobPositionFindOneQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ModelRepository<ClientJobPositionModel>>;

        handler = new ClientJobPositionFindOneQuery(repository);
    });

    it("should return a job position model when client job position exists", async () => {
        const mockJobPosition = {
            patientDni: "12345678",
            jobTitle: "Software Engineer",
        } as unknown as ClientJobPositionModel;

        repository.findOneAsync.mockResolvedValue(mockJobPosition);

        const query: ClientJobPositionFindOneQueryPayload = {
            patientDni: "12345678",
        };

        const result = await handler.handleAsync(query);

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: "patientDni", operator: "eq", value: query.patientDni },
        ]);
        expect(result).toEqual(mockJobPosition);
    });

    it("should throw ClientNotFoundError when client job position does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const query: ClientJobPositionFindOneQueryPayload = {
            patientDni: "12345678",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(ClientNotFoundError);
        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: "patientDni", operator: "eq", value: query.patientDni },
        ]);
    });
});
