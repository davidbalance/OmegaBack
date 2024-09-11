import { TestBed } from "@automock/jest";
import { ExamManagementService } from "./exam-management.service";

describe('ExamManagementService', () => {
    let service: ExamManagementService;

    beforeEach(async () => {
        const { unit } = TestBed.create(ExamManagementService).compile();
        service = unit;
    });

    it('', () => {
        expect(service).toBeDefined();
    })
    /*     let repository: jest.Mocked<ExamRepository>;
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
            const mockDto: PostExamRequestDto = {
                name: 'New Exam',
                subtype: 1
            };
            const mockedExamData = mockExam();
            const mockedSubtype = mockExamsSubtype();
    
            it('should create a new exam', async () => {
                // Arrange
                subtypeService.findOne.mockResolvedValue(mockedSubtype);
                repository.create.mockResolvedValue(mockedExamData);
    
                // Act
                const result = await service.create(mockDto);
    
                // Assert
                expect(subtypeService.findOne).toHaveBeenCalledWith(mockDto.subtype);
                expect(repository.create).toHaveBeenCalledWith({ ...mockDto, subtype: mockedSubtype });
                expect(result).toEqual(mockedExamData);
            });
        });
    
        describe('findAll', () => {
            const mockData = mockExams();
    
            it('should find all exams', async () => {
                // Arrange
                repository.find.mockResolvedValue(mockData);
    
                // Act
                const result = await service.findAll();
    
                // Assert
                expect(repository.find).toHaveBeenCalled();
                expect(result).toEqual(mockData);
            });
        });
    
        describe('findOne', () => {
            const id = 1;
            const mockedExamData = mockExam();
    
            it('should find an exam by ID', async () => {
                // Arrange
                repository.findOne.mockResolvedValue(mockedExamData);
    
                // Act
                const result = await service.findOne(id);
    
                // Assert
                expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
                expect(result).toEqual(mockedExamData);
            });
        });
    
        describe('updateOne', () => {
            const id = 1;
            const mockDto: PatchExamRequestDto = {
                name: 'Updated Exam',
                subtype: 2
            };
            const mockedExamData = mockExam();
            const mockedSubtype = mockExamsSubtype();
    
            it('should update an exam with a new subtype', async () => {
                // Arrange
                subtypeService.findOne.mockResolvedValue(mockedSubtype);
                repository.findOneAndUpdate.mockResolvedValue(mockedExamData);
    
                // Act
                const result = await service.updateOne(id, mockDto);
    
                // Assert
                expect(subtypeService.findOne).toHaveBeenCalledWith(mockDto.subtype);
                expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, { ...mockDto, subtype: mockedSubtype });
                expect(result).toEqual(mockedExamData);
            });
    
            it('should update an exam without changing the subtype', async () => {
                // Arrange
                const { subtype, ...data } = mockDto;
                const mockDtoWithoutSubtype: PatchExamRequestDto = data;
                repository.findOneAndUpdate.mockResolvedValue(mockedExamData);
    
                // Act
                const result = await service.updateOne(id, mockDtoWithoutSubtype);
    
                // Assert
                expect(subtypeService.findOne).not.toHaveBeenCalled();
                expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, mockDtoWithoutSubtype);
                expect(result).toEqual(mockedExamData);
            });
        });
    
        describe('deleteOne', () => {
            const id = 1;
    
            it('should delete an exam', async () => {
                // Arrange
                repository.findOneAndDelete.mockResolvedValue(undefined);
    
                // Act
                await service.deleteOne(id);
    
                // Assert
                expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id });
            });
        }); */
});