import { ExamSubtypeOption } from "@omega/laboratory/core/model/exam/exam-subtype-option.model";
import { ExamTypeOption } from "@omega/laboratory/core/model/exam/exam-type-option.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { ExamSubtypeOptionRepository, ExamTypeOptionRepository } from "../../repository/model.repositories";

export interface ExamTypeFindOptionsQuery extends QueryHandlerAsync<undefined, ExamTypeOption[]> {
    handleAsync(): Promise<ExamTypeOption[]>;
}

export class ExamTypeFindOptionsQueryImpl implements ExamTypeFindOptionsQuery {
    constructor(
        private readonly subtypeRepository: ExamSubtypeOptionRepository,
        private readonly typeRepository: ExamTypeOptionRepository,
    ) { }

    async handleAsync(): Promise<ExamTypeOption[]> {
        const subtypeBrute = await this.subtypeRepository.findManyAsync({ filter: [] });
        const subtypeOptions = subtypeBrute.reduce<Record<string, ExamSubtypeOption>>((prev, curr) => {
            if (!prev[curr.subtypeValue]) {
                prev[curr.subtypeValue] = {
                    value: curr.subtypeValue,
                    label: curr.subtypeLabel,
                    children: []
                }
            }

            prev[curr.subtypeValue].children.push({
                label: curr.examLabel,
                value: curr.examValue,
            })

            return prev;
        }, {});

        const typeBrute = await this.typeRepository.findManyAsync({ filter: [] });
        const groupedData = typeBrute.reduce<Record<string, ExamTypeOption>>((prev, curr) => {
            if (!prev[curr.typeValue]) {
                prev[curr.typeValue] = {
                    value: curr.typeValue,
                    label: curr.typeLabel,
                    children: []
                }
            }

            if (subtypeOptions[curr.subtypeValue]) {
                prev[curr.typeValue].children.push(subtypeOptions[curr.subtypeValue])
            }

            return prev;
        }, {});

        return Object.values(groupedData);
    }
}