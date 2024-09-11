import { TestBed } from "@automock/jest";
import { ExamSubtypeExternalConnectionController } from "./exam-subtype-external-connection.controller";
import { ExamSubtypeExternalConnectionService } from "../services/exam-subtype-external-connection.service";
import { PostExamSubtypeRequestDto } from "../dtos/request/exam-subtype.post.dto";
import { PatchExamSubtypeExternalRequestDto } from "../dtos/request/external-exam-subtype.patch.dto";
import { mockExtendedExamSubtype } from "../stub/extended-exam-subtype.stub";

describe('ExamSubtypeExternalConnectionController', () => {
    let controller: ExamSubtypeExternalConnectionController;
    let service: jest.Mocked<ExamSubtypeExternalConnectionService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ExamSubtypeExternalConnectionController).compile();
        controller = unit;
        service = unitRef.get(ExamSubtypeExternalConnectionService);
    });

    describe('create', () => {
        const source = 'source';
        const key = 'key';
        const mockDto: PostExamSubtypeRequestDto = {
            name: 'New Exam Subtype',
            type: 1,
        };
        const mockedExamSubtype = mockExtendedExamSubtype();
        const expectedValue = mockedExamSubtype;

        it('should call the service to create a new exam subtype', async () => {
            // Arrange
            service.create.mockResolvedValue(mockedExamSubtype);

            // Act
            const result = await controller.create(source, key, mockDto);

            // Assert
            expect(service.create).toHaveBeenCalledWith({ source, key }, mockDto);
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findOneAndUpdate', () => {
        const source = 'source';
        const key = 'key';
        const mockDto: PatchExamSubtypeExternalRequestDto = {
            name: 'Updated Exam Subtype'
        };
        const mockedExamSubtype = mockExtendedExamSubtype();
        const expectedValue = mockedExamSubtype;

        it('should call the service to update an exam subtype', async () => {
            // Arrange
            service.findOneAndUpdate.mockResolvedValue(mockedExamSubtype);

            // Act
            const result = await controller.findOneAndUpdate(source, key, mockDto);

            // Assert
            expect(service.findOneAndUpdate).toHaveBeenCalledWith({ source, key }, mockDto);
            expect(result).toEqual(expectedValue);
        });
    });
});