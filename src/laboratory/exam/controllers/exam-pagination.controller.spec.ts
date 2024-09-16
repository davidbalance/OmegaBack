import { TestBed } from "@automock/jest";
import { FilterMetaDto } from "@/shared/utils/bases/base.pagination.dto";
import { mockExams } from "../stub/exam.stub";
import { ExamPaginationController } from "./exam-pagination.controller";
import { ExamPaginationService } from "../services/exam-pagination.service";

describe('ExamPaginationController', () => {
    let controller: ExamPaginationController;
    let service: jest.Mocked<ExamPaginationService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ExamPaginationController).compile();
        controller = unit;
        service = unitRef.get(ExamPaginationService);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('find', () => {
        const subtype: number = 1;
        const query: FilterMetaDto = { page: 0, take: 100 }
        const mockedExams = mockExams();
        const expectedData = { data: mockedExams };

        it('should call the service to find an exam', async () => {
            // Arrange
            service.find.mockResolvedValue(mockedExams);

            // Act
            const result = await controller.find(subtype, query);

            // Assert
            expect(service.find).toHaveBeenCalledWith(query, subtype);
            expect(result).toEqual(expectedData);
        });
    });

    describe('count', () => {
        const subtype: number = 1;
        const query: FilterMetaDto = { page: 0, take: 100 }
        const mockedCount: number = 1;
        const expectedData = { pages: mockedCount };

        it('should call the service to count exams', async () => {
            // Arrange
            service.count.mockResolvedValue(mockedCount);

            // Act
            const result = await controller.count(subtype, query);

            // Assert
            expect(service.count).toHaveBeenCalledWith(query, subtype);
            expect(result).toEqual(expectedData);
        });
    });
});