import { TestBed } from "@automock/jest";
import { ExamExternalConnectionService } from "../services/exam-external-connection.service";
import { ExamExternalConnectionController } from "./exam-external-connection.controller";
import { PostExamExternalRequestDto } from "../dtos/request/post.exam-external.request.dto";
import { mockExam } from "../services/test/stub/exam.stub";
import { PostExamResponseDto } from "../dtos/response/post.exam.response.dto";
import { PatchExamExternalRequestDto } from "../dtos/request/patch.exam-external.request.dto";
import { PatchExamResponseDto } from "../dtos/response/patch.exam.response.dto";

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
        const mockResponse: PostExamResponseDto = mockExamData;

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
        const mockResponse: PatchExamResponseDto = mockExamData;
    
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