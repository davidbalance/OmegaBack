import { TestBed } from "@automock/jest";
import { ExamRepository } from "../repositories/exam.repository";
import { ExamPaginationService } from "./exam-pagination.service";
import { mockExamEntities } from "../stub/exam-entity.stub";

describe('ExamPaginationService', () => {
    let service: ExamPaginationService;
    let repository: jest.Mocked<ExamRepository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ExamPaginationService).compile();

        service = unit;
        repository = unitRef.get(ExamRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('queryBuilder', () => {
        const search = 'test';
        const page = 0;
        const take = 10;
        const extras = 1;

        const mockedDiseaseData = mockExamEntities();
        const expectedData = mockedDiseaseData;

        beforeEach(() => {
            repository.query.mockReturnValue({
                innerJoin: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
                addSelect: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                orderBy: jest.fn().mockReturnThis(),
                limit: jest.fn().mockReturnThis(),
                offset: jest.fn().mockReturnThis(),
                getRawMany: jest.fn().mockResolvedValue(mockedDiseaseData)
            } as any);
        });

        it('should build a query', async () => {
            // Arrange
            // Act
            const result = await service.find({ search, page, take }, extras);

            // Assert
            expect(repository.query).toHaveBeenCalledWith('exam');
            expect(repository.query().innerJoin).toHaveBeenCalledWith('exam.subtype', 'subtype', 'subtype.id = :subtype', { subtype: extras });
            expect(repository.query().select).toHaveBeenCalledWith('exam.id', 'id');
            expect(repository.query().addSelect).toHaveBeenNthCalledWith(1, 'exam.name', 'name');
            expect(repository.query().addSelect).toHaveBeenNthCalledWith(2, 'subtype.id', 'subtype');
            expect(repository.query().where).toHaveBeenCalledWith('exam.name LIKE :name', { name: `%${search}%` });
            expect(repository.query().limit).toHaveBeenCalledWith(take);
            expect(repository.query().offset).toHaveBeenCalledWith(page);
            expect(repository.query().getRawMany).toHaveBeenCalled();
            expect(result).toEqual(expectedData);
        });

        it('should build a query with field', async () => {
            // Arrange
            const field: string = 'name';
            // Act
            const result = await service.find({ search, page, take, field }, extras);

            // Assert
            expect(repository.query().orderBy).toHaveBeenCalledWith(field, 'ASC');
            expect(result).toEqual(expectedData);
        });

        it('should build a query with field and order', async () => {
            // Arrange
            const field: string = 'name';
            const order: any = 'desc';
            // Act
            const result = await service.find({ search, page, take, field, order }, extras);

            // Assert
            expect(repository.query().orderBy).toHaveBeenCalledWith(field, order.toUpperCase());
            expect(result).toEqual(expectedData);
        });
    });
});
