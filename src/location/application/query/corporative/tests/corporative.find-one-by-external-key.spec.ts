import { CorporativeExternalConnectionRepository, CorporativeRepository } from "@omega/location/application/repository/model.repositories";
import { CorporativeFindOneByExternalKeyQuery, CorporativeFindOneByExternalKeyQueryPayload } from "../corporative.find-one-by-external-key.query";
import { CorporativeModel } from "@omega/location/core/models/corporative/corporative.model";
import { CorporativeExternalConnectionModel } from "@omega/location/core/models/corporative/corporative-external-connection.model";
import { CorporativeExternalKeyNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative-external-key.errors";
import { CorporativeNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative.errors";

describe("CorporativeFindOneByExternalKeyQuery", () => {
    let externalConnectionRepository: jest.Mocked<CorporativeExternalConnectionRepository>;
    let modelRepository: jest.Mocked<CorporativeRepository>;
    let handler: CorporativeFindOneByExternalKeyQuery;

    beforeEach(() => {
        externalConnectionRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<CorporativeExternalConnectionRepository>;

        modelRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<CorporativeRepository>;

        handler = new CorporativeFindOneByExternalKeyQuery(externalConnectionRepository, modelRepository);
    });

    it("Should return an corporative model when the corporative exists", async () => {
        const mockExternalConnection = { corporativeId: "corporative123" } as unknown as CorporativeExternalConnectionModel;
        const mockCorporative = { corporativeId: "corporative123" } as unknown as CorporativeModel;

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);
        modelRepository.findOneAsync.mockResolvedValue(mockCorporative);

        const query: CorporativeFindOneByExternalKeyQueryPayload = {
            owner: "corporative-owner",
            value: "corporative-id",
        };

        const result = await handler.handleAsync(query);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'corporativeExternalOwner', operator: 'eq', value: query.owner },
            { field: 'corporativeExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'corporativeId', operator: 'eq', value: mockExternalConnection.corporativeId }
        ]);
        expect(result).toEqual(mockCorporative);
    });

    it("Should throw CorporativeExternalKeyNotFoundError when no external key mapping is found", async () => {
        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        modelRepository.findOneAsync.mockResolvedValue(null);

        const query: CorporativeFindOneByExternalKeyQueryPayload = {
            owner: "corporative-owner",
            value: "corporative-id",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(CorporativeExternalKeyNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'corporativeExternalOwner', operator: 'eq', value: query.owner },
            { field: 'corporativeExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(modelRepository.findOneAsync).not.toHaveBeenCalled();
    });

    it("Should throw CorporativeNotFoundError when the external key exists but the corporative does not", async () => {
        const mockExternalConnection = { corporativeId: "corporative123" } as unknown as CorporativeExternalConnectionModel;

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);
        modelRepository.findOneAsync.mockResolvedValue(null);

        const query: CorporativeFindOneByExternalKeyQueryPayload = {
            owner: "corporative-owner",
            value: "corporative-id",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(CorporativeNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'corporativeExternalOwner', operator: 'eq', value: query.owner },
            { field: 'corporativeExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'corporativeId', operator: 'eq', value: mockExternalConnection.corporativeId }
        ]);
    });
});
