
import { ExamTypeExternalSourceResolver } from "../../resolver/exam-type-external-source.resolver";
import { ExamTypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-type-external-connection.model";
import { CreateExamTypeFromExternalSourcePayload, CreateExamTypeFromExternalSourceService } from "../create-exam-type-from-external-source.service";

describe('CreateExamTypeFromExternalSourceService', () => {
    let service: CreateExamTypeFromExternalSourceService;
    let typeResolver: jest.Mocked<ExamTypeExternalSourceResolver>;

    beforeEach(async () => {

        typeResolver = {
            resolve: jest.fn(),
        } as unknown as jest.Mocked<ExamTypeExternalSourceResolver>;

        service = new CreateExamTypeFromExternalSourceService(typeResolver);
    });

    it('should resolve and return an exam type from the external source', async () => {
        const mockType: ExamTypeExternalConnectionModel = {
            typeId: 'exam-id',
        } as unknown as ExamTypeExternalConnectionModel;

        typeResolver.resolve.mockResolvedValue(mockType);

        const payload: CreateExamTypeFromExternalSourcePayload = {
            owner: 'external-value',
            typeKey: 'type-key',
            typeName: 'type-name'
        };

        const result = await service.createAsync(payload);

        expect(typeResolver.resolve).toHaveBeenCalledWith(payload);
        expect(result).toEqual(mockType);
    });
});
