import { ExamSubtypeManagementService } from "@/laboratory/exam-subtype/services/exam-subtype-management.service";
import { ExamRepository } from "../repositories/exam.repository";
import { ExamManagementService } from "./exam-management.service";
import { TestBed } from "@automock/jest";
import { ExamRequestDto } from "../dtos/request/exam.base.dto";
import { mockExam } from "../stub/exam.stub";
import { mockExamSubtype } from "@/laboratory/exam-subtype/stub/exam-subtype.stub";
import { mockExamEntity } from "../stub/exam-entity.stub";

describe('ExamManagementService', () => {
    let service: ExamManagementService;
    let repository: jest.Mocked<ExamRepository>;
    let subtypeService: jest.Mocked<ExamSubtypeManagementService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ExamManagementService).compile();
        service = unit;
        repository = unitRef.get(ExamRepository);
        subtypeService = unitRef.get(ExamSubtypeManagementService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create an exam', async () => {
            // Arrange
            const mockDto: ExamRequestDto = {
                name: 'New Exam',
                subtype: 1,
            };
            const mockedExamData = mockExamEntity();
            const mockedSubtype = mockExamSubtype();
            const expectedData = { ...mockedExamData, subtype: mockDto.subtype };
            subtypeService.findOne.mockResolvedValue(mockedSubtype);
            repository.create.mockResolvedValue(mockedExamData);

            // Act
            const result = await service.create(mockDto);

            // Assert
            expect(subtypeService.findOne).toHaveBeenCalledWith(mockDto.subtype);
            expect(repository.create).toHaveBeenCalledWith({ ...mockDto, subtype: { id: mockedSubtype.id } });
            expect(result).toEqual(expectedData);
        });
    });

    describe('findOne', () => {
        it('should find an exam by ID', async () => {
            // Arrange
            const id = 1;
            const mockedExamData = mockExamEntity();
            const expectedData = { ...mockedExamData, subtype: mockedExamData.subtype.id };
            repository.findOne.mockResolvedValue(mockedExamData);

            // Act
            const result = await service.findOne(id);

            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({ where: { id }, relations: { subtype: true } });
            expect(result).toEqual(expectedData);
        });
    });

    describe('updateOne', () => {
        it('should update an exam with a new subtype', async () => {
            // Arrange
            const id = 1;
            const mockDto: ExamRequestDto = {
                name: 'Updated Exam',
                subtype: 2,
            };
            const mockedExamData = mockExamEntity();
            const mockedSubtype = mockExamSubtype();
            const expectedData = { ...mockedExamData, subtype: mockedSubtype.id };
            subtypeService.findOne.mockResolvedValue(mockedSubtype);
            repository.findOneAndUpdate.mockResolvedValue(mockedExamData);

            // Act
            const result = await service.updateOne(id, mockDto);

            // Assert
            expect(subtypeService.findOne).toHaveBeenCalledWith(mockDto.subtype);
            const { subtype, ...expectedDto } = mockDto;
            const { type, ...expectedSubtypeDto } = mockedSubtype;
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, { ...expectedDto, subtype: expectedSubtypeDto });
            expect(result).toEqual(expectedData);
        });

        it('should update an exam without changing the subtype', async () => {
            // Arrange
            const id = 1;
            const mockDto: Partial<ExamRequestDto> = {
                name: 'Updated Exam'
            };
            const mockedExamData = mockExamEntity();
            const expectedData = { ...mockedExamData, subtype: mockedExamData.subtype.id };
            repository.findOneAndUpdate.mockResolvedValue(mockedExamData);

            // Act
            const result = await service.updateOne(id, mockDto);

            // Assert
            expect(subtypeService.findOne).not.toHaveBeenCalled();
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, { ...mockDto, subtype: undefined });
            expect(result).toEqual(expectedData);
        });
    });

    describe('deleteOne', () => {
        it('should delete an exam', async () => {
            // Arrange
            const id = 1;
            repository.findOneAndDelete.mockResolvedValue(undefined);

            // Act
            await service.deleteOne(id);

            // Assert
            expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id });
        });
    });
});
