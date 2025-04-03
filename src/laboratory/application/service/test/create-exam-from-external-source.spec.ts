import { ExamExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-external-connection.model";
import { ExamExternalConnectionRepository } from "../../repository/model.repositories";
import { ExamExternalSourceResolver } from "../../resolver/exam-external-source.resolver";
import { ExamSubtypeExternalSourceResolver } from "../../resolver/exam-subtype-external-source.resolver";
import { ExamTypeExternalSourceResolver } from "../../resolver/exam-type-external-source.resolver";
import { CreateExamFromExternalSourcePayload, CreateExamFromExternalSourceService } from "../create-exam-from-external-source.service";
import { ExamTypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-type-external-connection.model";
import { ExamSubtypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-subtype-external-connection.model";

describe('CreateExamFromExternalSourceService', () => {
    let service: CreateExamFromExternalSourceService;
    let externalConnection: jest.Mocked<ExamExternalConnectionRepository>;
    let typeResolver: jest.Mocked<ExamTypeExternalSourceResolver>;
    let subtypeResolver: jest.Mocked<ExamSubtypeExternalSourceResolver>;
    let examResolver: jest.Mocked<ExamExternalSourceResolver>;

    beforeEach(async () => {
        externalConnection = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamExternalConnectionRepository>;

        typeResolver = {
            resolve: jest.fn(),
        } as unknown as jest.Mocked<ExamTypeExternalSourceResolver>;

        subtypeResolver = {
            resolve: jest.fn(),
        } as unknown as jest.Mocked<ExamSubtypeExternalSourceResolver>;

        examResolver = {
            resolve: jest.fn(),
        } as unknown as jest.Mocked<ExamExternalSourceResolver>;

        service = new CreateExamFromExternalSourceService(externalConnection, typeResolver, subtypeResolver, examResolver);
    });

    it('should return an existing exam if it is already present in the repository', async () => {
        const mockExam: ExamExternalConnectionModel = {
            examId: 'exam-id',
            examExternalKey: 'external-value',
            examExternalOwner: 'external-owner'
        } as unknown as ExamExternalConnectionModel;
        externalConnection.findOneAsync.mockResolvedValue(mockExam);

        const payload: CreateExamFromExternalSourcePayload = {
            owner: 'external-value',
            examKey: 'external-owner',
            examName: 'exam-name',
            typeId: 'test-id',
            subtypeId: 'subtype-id',
            subtypeKey: 'subtype-key',
            subtypeName: 'subtype-name',
            typeKey: 'type-key',
            typeName: 'type-name'
        };

        const result = await service.createAsync(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'examExternalKey', operator: 'eq', value: payload.examKey },
            { field: 'examExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(typeResolver.resolve).not.toHaveBeenCalled();
        expect(subtypeResolver.resolve).not.toHaveBeenCalled();
        expect(examResolver.resolve).not.toHaveBeenCalled();
        expect(result).toEqual(mockExam);
    });

    it('should resolve type, subtype, and exam when exam is not found in the repository', async () => {
        externalConnection.findOneAsync.mockResolvedValue(null);

        const resolvedType: ExamTypeExternalConnectionModel = { typeId: '1' } as unknown as ExamTypeExternalConnectionModel;
        const resolvedSubtype: ExamSubtypeExternalConnectionModel = { subtypeId: 'A' } as unknown as ExamSubtypeExternalConnectionModel;
        const resolvedExam: ExamExternalConnectionModel = { id: '456' } as unknown as ExamExternalConnectionModel;

        typeResolver.resolve.mockResolvedValue(resolvedType);
        subtypeResolver.resolve.mockResolvedValue(resolvedSubtype);
        examResolver.resolve.mockResolvedValue(resolvedExam);

        const payload: CreateExamFromExternalSourcePayload = {
            owner: 'external-value',
            examKey: 'external-owner',
            examName: 'exam-name',
            typeId: 'test-id',
            subtypeId: 'subtype-id',
            subtypeKey: 'subtype-key',
            subtypeName: 'subtype-name',
            typeKey: 'type-key',
            typeName: 'type-name'
        };

        const result = await service.createAsync(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'examExternalKey', operator: 'eq', value: payload.examKey },
            { field: 'examExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(typeResolver.resolve).toHaveBeenCalledWith(payload);
        expect(subtypeResolver.resolve).toHaveBeenCalledWith({ ...payload, typeId: resolvedType.typeId });
        expect(examResolver.resolve).toHaveBeenCalledWith({ ...payload, typeId: resolvedType.typeId, subtypeId: resolvedSubtype.subtypeId });
        expect(result).toEqual(resolvedExam);
    });
});
