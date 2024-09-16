import { TestBed } from "@automock/jest";
import { ExamManagementService } from "../services/exam-management.service";
import { ExamManagementController } from "./exam-management.controller";
import { mockExam } from "../stub/exam.stub";
import { PatchExamRequestDto } from "../dtos/request/exam.patch.dto";

describe('ExamManagementController', () => {
    let controller: ExamManagementController;
    let service: jest.Mocked<ExamManagementService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ExamManagementController).compile();
        controller = unit;
        service = unitRef.get(ExamManagementService);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('findOne', () => {
        const id = 1;
        const mockedExam = mockExam();
        const expectedData = mockedExam;

        it('should call the service to find a exam', async () => {
            // Arrange
            service.findOne.mockResolvedValue(mockedExam);

            // Act
            const result = await controller.findOne(id);

            // Assert
            expect(service.findOne).toHaveBeenCalledWith(id);
            expect(result).toEqual(expectedData);
        });
    });

    describe('updateOne', () => {
        const id = 1;
        const mockDto: PatchExamRequestDto = {
            name: 'Exam name'
        }
        const mockedExam = mockExam();

        it('should call the service to update a exam', async () => {
            // Arrange
            service.updateOne.mockResolvedValue(mockedExam);

            // Act
            await controller.updateOne(id, mockDto);

            // Assert
            expect(service.updateOne).toHaveBeenCalledWith(id, mockDto);
        });
    });
});