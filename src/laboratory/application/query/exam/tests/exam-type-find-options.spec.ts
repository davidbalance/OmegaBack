/* eslint-disable @typescript-eslint/unbound-method */
import { ExamSubtypeOptionModel } from "@omega/laboratory/core/model/exam/exam-subtype-option.model";
import { ExamTypeOptionModel } from "@omega/laboratory/core/model/exam/exam-type-option.model";
import { ExamTypeFindOptionsQuery } from "../exam-type-find-options.query";
import { ExamSubtypeOptionRepository, ExamTypeOptionRepository } from "@omega/laboratory/application/repository/model.repositories";

describe("ExamTypeFindOptionsQuery", () => {
    let subtypeRepository: jest.Mocked<ExamSubtypeOptionRepository>;
    let typeRepository: jest.Mocked<ExamTypeOptionRepository>;
    let handler: ExamTypeFindOptionsQuery;

    beforeEach(() => {
        subtypeRepository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamSubtypeOptionRepository>;

        typeRepository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamTypeOptionRepository>;

        handler = new ExamTypeFindOptionsQuery(subtypeRepository, typeRepository);
    });

    it("should return grouped exam type options with subtypes", async () => {
        const mockSubtypeData: ExamSubtypeOptionModel[] = [
            { subtypeValue: "subtype-1", subtypeLabel: "Subtype 1", examValue: "exam-1", examLabel: "Exam 1" },
            { subtypeValue: "subtype-1", subtypeLabel: "Subtype 1", examValue: "exam-2", examLabel: "Exam 2" },
            { subtypeValue: "subtype-2", subtypeLabel: "Subtype 2", examValue: "exam-3", examLabel: "Exam 3" }
        ] as unknown as ExamSubtypeOptionModel[];

        const mockTypeData: ExamTypeOptionModel[] = [
            { typeValue: "type-1", typeLabel: "Type 1", subtypeValue: "subtype-1" },
            { typeValue: "type-2", typeLabel: "Type 2", subtypeValue: "subtype-2" }
        ] as unknown as ExamTypeOptionModel[];

        subtypeRepository.findManyAsync.mockResolvedValue(mockSubtypeData);
        typeRepository.findManyAsync.mockResolvedValue(mockTypeData);

        const result = await handler.handleAsync();

        expect(result).toEqual([
            {
                value: "type-1",
                label: "Type 1",
                children: [
                    {
                        value: "subtype-1",
                        label: "Subtype 1",
                        children: [
                            { value: "exam-1", label: "Exam 1" },
                            { value: "exam-2", label: "Exam 2" }
                        ]
                    }
                ]
            },
            {
                value: "type-2",
                label: "Type 2",
                children: [
                    {
                        value: "subtype-2",
                        label: "Subtype 2",
                        children: [
                            { value: "exam-3", label: "Exam 3" }
                        ]
                    }
                ]
            }
        ]);

        expect(subtypeRepository.findManyAsync).toHaveBeenCalled();
        expect(typeRepository.findManyAsync).toHaveBeenCalled();
    });

    it("should return an empty array when there are no exam types or subtypes", async () => {
        subtypeRepository.findManyAsync.mockResolvedValue([]);
        typeRepository.findManyAsync.mockResolvedValue([]);

        const result = await handler.handleAsync();

        expect(result).toEqual([]);
        expect(subtypeRepository.findManyAsync).toHaveBeenCalled();
        expect(typeRepository.findManyAsync).toHaveBeenCalled();
    });

    it("should handle missing subtype options gracefully", async () => {
        const mockSubtypeData = [
            { subtypeValue: "subtype-1", subtypeLabel: "Subtype 1", examValue: "exam-1", examLabel: "Exam 1" }
        ] as unknown as ExamSubtypeOptionModel[];

        const mockTypeData = [
            { typeValue: "type-1", typeLabel: "Type 1", subtypeValue: "subtype-1" },
            { typeValue: "type-2", typeLabel: "Type 2", subtypeValue: "subtype-2" }
        ] as unknown as ExamTypeOptionModel[];

        subtypeRepository.findManyAsync.mockResolvedValue(mockSubtypeData);
        typeRepository.findManyAsync.mockResolvedValue(mockTypeData);

        const result = await handler.handleAsync();

        expect(result).toEqual([
            {
                value: "type-1",
                label: "Type 1",
                children: [
                    {
                        value: "subtype-1",
                        label: "Subtype 1",
                        children: [
                            { value: "exam-1", label: "Exam 1" }
                        ]
                    }
                ]
            },
            {
                value: "type-2",
                label: "Type 2",
                children: []
            }
        ]);
    });
});
