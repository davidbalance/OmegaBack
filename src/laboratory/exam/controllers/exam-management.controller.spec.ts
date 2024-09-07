import { TestBed } from "@automock/jest";
import { ExamManagementService } from "../services/exam-management.service";
import { ExamManagementController } from "./exam-management.controller";
import { mockExam } from "../stub/exam.stub";
import { GetExamResponseDto } from "../dtos/response/exam.get.dto";
import { PatchExamRequestDto } from "../dtos/request/exam.patch.dto";

describe('ExamManagementController', () => {
    let controller: ExamManagementController;

    it('', () => {
        expect(controller).toBeDefined();
    })
    /*     let service: jest.Mocked<ExamManagementService>;
    
        beforeEach(async () => {
            const { unit, unitRef } = TestBed.create(ExamManagementController).compile();
    
            controller = unit;
            service = unitRef.get(ExamManagementService);
        });
    
        afterEach(() => {
            jest.clearAllMocks();
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
            const mockResponse: any = {};
    
            it('should call the service to update an exam', async () => {
                // Arrange
                service.updateOne.mockResolvedValue(mockExamData);
    
                // Act
                const result = await controller.updateOne(id, mockDto);
    
                // Assert
                expect(service.updateOne).toHaveBeenCalledWith(id, mockDto);
                expect(result).toEqual(mockResponse);
            });
        }); */
});