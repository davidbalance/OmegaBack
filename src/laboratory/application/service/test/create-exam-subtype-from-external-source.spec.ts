
import { ExamSubtypeExternalConnectionRepository } from "../../repository/model.repositories";
import { ExamSubtypeExternalSourceResolver } from "../../resolver/exam-subtype-external-source.resolver";
import { ExamTypeExternalSourceResolver } from "../../resolver/exam-type-external-source.resolver";
import { ExamTypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-type-external-connection.model";
import { CreateExamSubtypeFromExternalSourcePayload, CreateExamSubtypeFromExternalSourceService } from "../create-exam-subtype-from-external-source.service";
import { ExamSubtypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-subtype-external-connection.model";

describe('CreateExamSubtypeFromExternalSourceService', () => {
    let service: CreateExamSubtypeFromExternalSourceService;
    let externalConnection: jest.Mocked<ExamSubtypeExternalConnectionRepository>;
    let typeResolver: jest.Mocked<ExamTypeExternalSourceResolver>;
    let subtypeResolver: jest.Mocked<ExamSubtypeExternalSourceResolver>;

    beforeEach(async () => {
        externalConnection = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamSubtypeExternalConnectionRepository>;

        typeResolver = {
            resolve: jest.fn(),
        } as unknown as jest.Mocked<ExamTypeExternalSourceResolver>;

        subtypeResolver = {
            resolve: jest.fn(),
        } as unknown as jest.Mocked<ExamSubtypeExternalSourceResolver>;

        service = new CreateExamSubtypeFromExternalSourceService(externalConnection, typeResolver, subtypeResolver);
    });

    it('should return an existing exam subtype if found in the repository', async () => {
        const mockSubtype: ExamSubtypeExternalConnectionModel = {
            examId: 'exam-id',
            subtypeExternalKey: 'external-value',
            subtypeExternalOwner: 'external-owner'
        } as unknown as ExamSubtypeExternalConnectionModel;
        externalConnection.findOneAsync.mockResolvedValue(mockSubtype);

        const payload: CreateExamSubtypeFromExternalSourcePayload = {
            owner: 'external-value',
            typeId: 'test-id',
            subtypeKey: 'subtype-key',
            subtypeName: 'subtype-name',
            typeKey: 'type-key',
            typeName: 'type-name'
        };

        const result = await service.createAsync(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'subtypeExternalKey', operator: 'eq', value: payload.subtypeKey },
            { field: 'subtypeExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(typeResolver.resolve).not.toHaveBeenCalled();
        expect(subtypeResolver.resolve).not.toHaveBeenCalled();
        expect(result).toEqual(mockSubtype);
    });

    it('should resolve type and subtype when subtype is not found', async () => {
        externalConnection.findOneAsync.mockResolvedValue(null);

        const resolvedType: ExamTypeExternalConnectionModel = { typeId: '1' } as unknown as ExamTypeExternalConnectionModel;
        const resolvedSubtype: ExamSubtypeExternalConnectionModel = { subtypeId: 'A' } as unknown as ExamSubtypeExternalConnectionModel;

        typeResolver.resolve.mockResolvedValue(resolvedType);
        subtypeResolver.resolve.mockResolvedValue(resolvedSubtype);

        const payload: CreateExamSubtypeFromExternalSourcePayload = {
            owner: 'external-value',
            subtypeKey: 'external-owner',
            subtypeName: 'subtype-name',
            typeId: 'test-id',
            typeKey: 'type-key',
            typeName: 'type-name'
        };

        const result = await service.createAsync(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'subtypeExternalKey', operator: 'eq', value: payload.subtypeKey },
            { field: 'subtypeExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(typeResolver.resolve).toHaveBeenCalledWith(payload);
        expect(subtypeResolver.resolve).toHaveBeenCalledWith({ ...payload, typeId: resolvedType.typeId });
        expect(result).toEqual(resolvedSubtype);
    });
});
