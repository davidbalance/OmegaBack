/* eslint-disable @typescript-eslint/unbound-method */
import { Corporative } from "@omega/location/core/domain/corporative/corporative.domain";
import { CorporativeRepository } from "@omega/location/application/repository/aggregate.repositories";
import { CorporativeCreateFromExternalSourceCommand, CorporativeCreateFromExternalSourceCommandPayload } from "../corporative-create-from-external-source.command";
import { CorporativeExternalConnectionRepository } from "@omega/location/application/repository/model.repositories";
import { CorporativeExternalConnectionModel } from "@omega/location/core/models/corporative/corporative-external-connection.model";
import { CorporativeExternalKeyConflictError } from "@omega/location/core/domain/corporative/errors/corporative-external-key.errors";

describe("CorporativeCreateFromExternalSourceCommand", () => {
    let externalConnectionRepository: jest.Mocked<CorporativeExternalConnectionRepository>;
    let aggregateRepository: jest.Mocked<CorporativeRepository>;
    let handler: CorporativeCreateFromExternalSourceCommand;

    beforeEach(() => {
        externalConnectionRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<CorporativeExternalConnectionRepository>;

        aggregateRepository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn()
        } as unknown as jest.Mocked<CorporativeRepository>;

        handler = new CorporativeCreateFromExternalSourceCommand(externalConnectionRepository, aggregateRepository);
    });

    it("should successfully create a new corporative and assigning an external key", async () => {
        const payload: CorporativeCreateFromExternalSourceCommandPayload = {
            name: "NewCorporative",
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value'
        };

        const mockCorporative: Corporative = {
            addExternalKey: jest.fn()
        } as unknown as Corporative

        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        aggregateRepository.findOneAsync.mockResolvedValue(null);
        jest.spyOn(Corporative, "create").mockReturnValue(mockCorporative);

        await handler.handleAsync(payload);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'corporativeExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
            { field: 'corporativeExternalKey', operator: 'eq', value: payload.externalKeyValue },
        ]);
        expect(aggregateRepository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "name", operator: "eq", value: payload.name }] });
        expect(Corporative.create).toHaveBeenCalledWith(payload);
        expect(mockCorporative.addExternalKey).toHaveBeenCalledWith({
            owner: payload.externalKeyOwner,
            value: payload.externalKeyValue
        });
        expect(aggregateRepository.saveAsync).toHaveBeenCalled();
    });

    it("should successfully assign an external key to an existing corporative", async () => {
        const payload: CorporativeCreateFromExternalSourceCommandPayload = {
            name: "NewCorporative",
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value'
        };

        const mockCorporative: Corporative = {
            addExternalKey: jest.fn()
        } as unknown as Corporative

        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        aggregateRepository.findOneAsync.mockResolvedValue(mockCorporative);

        await handler.handleAsync(payload);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'corporativeExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
            { field: 'corporativeExternalKey', operator: 'eq', value: payload.externalKeyValue },
        ]);
        expect(aggregateRepository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "name", operator: "eq", value: payload.name }] });
        expect(mockCorporative.addExternalKey).toHaveBeenCalledWith({
            owner: payload.externalKeyOwner,
            value: payload.externalKeyValue
        });
        expect(aggregateRepository.saveAsync).toHaveBeenCalled();
    });

    it("should throw CorporativeExternalKeyConflictError when the external key already exists", async () => {
        const mockExternalConnection: CorporativeExternalConnectionModel = {} as unknown as CorporativeExternalConnectionModel;
        const payload: CorporativeCreateFromExternalSourceCommandPayload = {
            name: "ExistingCorporative",
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value'
        };

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);

        await expect(handler.handleAsync(payload)).rejects.toThrow(CorporativeExternalKeyConflictError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'corporativeExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
            { field: 'corporativeExternalKey', operator: 'eq', value: payload.externalKeyValue },
        ]);
        expect(aggregateRepository.findOneAsync).not.toHaveBeenCalled();
        expect(aggregateRepository.saveAsync).not.toHaveBeenCalled();
    });
});