import { TestBed } from "@automock/jest";
import { ExamExternalConnectionService } from "../services/exam-external-connection.service";
import { ExamExternalListener } from "./exam-external.listener";
import { Exam } from "../entities/exam.entity";
import { PostExamExternalRequestDto } from "../dtos/request/external-exam.post.dto";

describe('ExamExternalListener', () => {
    let service: ExamExternalListener;
    let externalConnectionService: jest.Mocked<ExamExternalConnectionService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ExamExternalListener).compile();

        service = unit;
        externalConnectionService = unitRef.get(ExamExternalConnectionService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findOrCreate', () => {
        const key = 'key';
        const source = 'source';
        const mockData: PostExamExternalRequestDto = {
            type: {
                key: "test-exam-type-key",
                name: "test-exam-type-name"
            },
            name: "test-exam-name"
        };

        it('should call the external service to find or create an exam', async () => {
            // Arrange
            externalConnectionService.findOneOrCreate.mockResolvedValue(undefined);

            // Act
            await service.findOrCreate({ key, source, data: mockData });

            // Assert
            expect(externalConnectionService.findOneOrCreate).toHaveBeenCalledWith({ key, source }, mockData);
        });
    });
});
