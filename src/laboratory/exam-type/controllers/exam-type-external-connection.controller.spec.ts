import { TestBed } from "@automock/jest";
import { ExamTypeExternalConnectionService } from "../services/exam-type-external-connection.service";
import { ExamTypeExternalConnectionController } from "./exam-type-external-connection.controller";
import { PostExamTypeRequestDto } from "../dtos/request/post.exam-type.dto";
import { mockExamType } from "../services/test/stub/exam-type.stub";
import { PostExamTypeResponseDto } from "../dtos/response/post.exam-type.dto";
import { PatchExamExternalRequestDto } from "@/laboratory/exam/dtos/request/patch.exam-external.request.dto";
import { PatchExamTypeResponseDto } from "../dtos/response/patch.exam-type.dto";

describe('ExamTypeExternalConnectionController', () => {
    let controller: ExamTypeExternalConnectionController;
    let service: jest.Mocked<ExamTypeExternalConnectionService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ExamTypeExternalConnectionController).compile();

        controller = unit;
        service = unitRef.get(ExamTypeExternalConnectionService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        const source = 'source';
        const key = 'key';
        const mockDto: PostExamTypeRequestDto = {
            name: 'New Exam Type',
        };
        const mockExamTypeData = mockExamType();
        const mockResponse: PostExamTypeResponseDto = mockExamTypeData;

        it('should call the service to create a new exam type', async () => {
            // Arrange
            service.create.mockResolvedValue(mockExamTypeData);

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
            name: 'Updated Exam Type',
        };
        const mockExamTypeData = mockExamType();
        const mockResponse: PatchExamTypeResponseDto = mockExamTypeData;

        it('should call the service to update an exam type', async () => {
            // Arrange
            service.findOneAndUpdate.mockResolvedValue(mockExamTypeData);

            // Act
            const result = await controller.findOneAndUpdate(source, key, mockDto);

            // Assert
            expect(service.findOneAndUpdate).toHaveBeenCalledWith({ source, key }, mockDto);
            expect(result).toEqual(mockResponse);
        });
    });
});