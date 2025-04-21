import { ExamTypeFindOptionsQuery } from "@omega/laboratory/application/query/exam/exam-type-find-options.query";
import { ExamColumnService } from "./exam-column.service";
import { Test, TestingModule } from "@nestjs/testing";
import { ExamTypeFindOptionsQueryToken } from "@omega/laboratory/nest/inject/query.inject";
import { ExamTypeOption } from "@omega/laboratory/core/model/exam/exam-type-option.model";
import { ExamColumn } from "@omega/medical/application/providers/exam-column.provider";

describe("ExamColumnService", () => {
    let service: ExamColumnService;
    let options: jest.Mocked<ExamTypeFindOptionsQuery>;

    beforeEach(async () => {
        options = {
            handleAsync: jest.fn()
        } as unknown as jest.Mocked<ExamTypeFindOptionsQuery>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ExamColumnService,
                { provide: ExamTypeFindOptionsQueryToken, useValue: options },
            ]
        }).compile();

        service = module.get<ExamColumnService>(ExamColumnService);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should return formatted ExamColumn array', async () => {
        const mockExamValue: ExamTypeOption[] = [
            {
                label: 'Category A',
                value: 'Category A',
                children: [
                    {
                        label: 'Category B',
                        value: 'Group 1',
                        children: [{ label: 'Category C', value: 'Exam' }]
                    },
                    {
                        label: 'Category B',
                        value: 'Group 2',
                        children: [{ label: 'Category C', value: 'Exam' }]
                    }
                ]
            }
        ]
        const expectedValue: ExamColumn[] = mockExamValue.map(e => ({
            value: e.label,
            children: e.children.map(x => ({
                value: x.label,
                children: x.children.map(y => y.label)
            }))
        }));

        options.handleAsync.mockResolvedValue(mockExamValue);

        const result = await service.find();


        expect(options.handleAsync).toHaveBeenCalled();
        expect(result).toEqual(expectedValue);
    });

});