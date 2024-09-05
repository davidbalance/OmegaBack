import { TestBed } from "@automock/jest";
import { ExamManagementService } from "../services/exam-management.service";
import { ExamManagementController } from "./exam-management.controller";
import { PostExamRequestDto } from "../dtos/request/post.exam.request.dto";
import { mockExam } from "../services/test/stub/exam.stub";
import { PostExamResponseDto } from "../dtos/response/post.exam.response.dto";
import { GetExamResponseDto } from "../dtos/response/get.exam.response.dto";
import { PatchExamRequestDto } from "../dtos/request/patch.exam.request.dto";
import { PatchExamResponseDto } from "../dtos/response/patch.exam.response.dto";

describe('ExamManagementController', () => {
    let controller: ExamManagementController;
    let service: jest.Mocked<ExamManagementService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ExamManagementController).compile();

        controller = unit;
        service = unitRef.get(ExamManagementService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        const mockDto: PostExamRequestDto = {
            name: 'New Exam',
            subtype: 1
        };
        const mockExamData = mockExam();
        const mockResponse: PostExamResponseDto = mockExamData;

        it('should call the service to create a new exam', async () => {
            // Arrange
            service.create.mockResolvedValue(mockExamData);

            // Act
            const result = await controller.create(mockDto);

            // Assert
            expect(service.create).toHaveBeenCalledWith(mockDto);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('findOne', () => {
        const id = 1;
        const mockExamData = mockExam();
        const mockResponse: GetExamResponseDto = mockExamData;

        it('should call the service to find an exam by ID', async () => {
            // Arrange
            service.findOne.mockResolvedValue(mockExamData);

            // Act
            const result = await controller.findOne(id);

            // Assert
            expect(service.findOne).toHaveBeenCalledWith(id);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('updateOne', () => {
        const id = 1;
        const mockDto: PatchExamRequestDto = {
            name: 'Updated Exam',
        };
        const mockExamData = mockExam();
        const mockResponse: PatchExamResponseDto = mockExamData;

        it('should call the service to update an exam', async () => {
            // Arrange
            service.updateOne.mockResolvedValue(mockExamData);

            // Act
            const result = await controller.updateOne(id, mockDto);

            // Assert
            expect(service.updateOne).toHaveBeenCalledWith(id, mockDto);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('deleteOne', () => {
        const id = 1;

        it('should call the service to delete an exam', async () => {
            // Arrange
            service.deleteOne.mockResolvedValue(undefined);

            // Act
            const result = await controller.deleteOne(id);

            // Assert
            expect(service.deleteOne).toHaveBeenCalledWith(id);
            expect(result).toEqual({});
        });
    });
});