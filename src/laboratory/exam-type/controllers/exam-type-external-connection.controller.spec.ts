import { TestBed } from "@automock/jest";
import { ExamTypeExternalConnectionController } from "./exam-type-external-connection.controller";
import { ExamTypeExternalConnectionService } from "../services/exam-type-external-connection.service";
import { PostExamTypeRequestDto } from "../dtos/request/exam-type.post.dto";
import { mockExtendedExamType } from "../stub/extended-exam-type.stub";
import { PatchExamExternalRequestDto } from "@/laboratory/exam/dtos/request/external-exam.patch.dto";

describe('ExamTypeExternalConnectionController', () => {
    let controller: ExamTypeExternalConnectionController;
    let service: jest.Mocked<ExamTypeExternalConnectionService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ExamTypeExternalConnectionController).compile();
        controller = unit;
        service = unitRef.get(ExamTypeExternalConnectionService);
    });

    it('', () => {
        expect(controller).toBeDefined();
    })

    describe('create', () => {
        const source = 'source';
        const key = 'key';
        const mockDto: PostExamTypeRequestDto = {
            name: 'New Exam Type',
        };
        const mockExamTypeData = mockExtendedExamType();
        const mockResponse = mockExamTypeData;

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
        const mockExamTypeData = mockExtendedExamType();
        const mockResponse = mockExamTypeData;

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