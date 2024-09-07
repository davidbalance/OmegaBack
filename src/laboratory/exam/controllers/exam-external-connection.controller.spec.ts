import { TestBed } from "@automock/jest";
import { ExamExternalConnectionService } from "../services/exam-external-connection.service";
import { ExamExternalConnectionController } from "./exam-external-connection.controller";
import { PostExamExternalRequestDto } from "../dtos/request/external-exam.post.dto";
import { mockExam } from "../stub/exam.stub";
import { PatchExamExternalRequestDto } from "../dtos/request/external-exam.patch.dto";
import { PostExtendedExamResponseDto } from "../dtos/response/extended-exam.post.dto";
import { PatchExtendedExamResponseDto } from "../dtos/response/extended-exam.patch.dto";

describe('ExamExternalConnectionController', () => {
    let controller: ExamExternalConnectionController;
    let service: jest.Mocked<ExamExternalConnectionService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ExamExternalConnectionController).compile();

        controller = unit;
        service = unitRef.get(ExamExternalConnectionService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        const source = 'source';
        const key = 'key';
        const mockDto: PostExamExternalRequestDto = {
            name: 'New Exam',
            type: undefined
        };
        const mockExamData = mockExam();
        const mockResponse: PostExtendedExamResponseDto = mockExamData;

        it('should call the service to create a new exam', async () => {
            // Arrange
            service.create.mockResolvedValue(mockExamData);

            // Act
            const result = await controller.create(source, key, mockDto);

            // Assert
            expect(service.create).toHaveBeenCalledWith({ source, key }, mockDto);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('findOneAndUpdate', () => {
        const source = 'source';
        const key = 'key';
        const mockDto: PatchExamExternalRequestDto = {
            name: 'Updated Exam',
        };
        const mockExamData = mockExam();
        const mockResponse: PatchExtendedExamResponseDto = mockExamData;

        it('should call the service to update an exam', async () => {
            // Arrange
            service.findOneAndUpdate.mockResolvedValue(mockExamData);

            // Act
            const result = await controller.findOneAndUpdate(source, key, mockDto);

            // Assert
            expect(service.findOneAndUpdate).toHaveBeenCalledWith({ source, key }, mockDto);
            expect(result).toEqual(mockResponse);
        });
    });
});