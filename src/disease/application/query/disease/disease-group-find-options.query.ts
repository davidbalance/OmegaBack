import { DiseaseGroupOption } from "@omega/disease/core/model/disease/disease-group-option.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { DiseaseGroupOptionRepository } from "../../repository/model.repositories";

export interface DiseaseGroupFindOptionsQuery extends QueryHandlerAsync<undefined, DiseaseGroupOption[]> {
    handleAsync(): Promise<DiseaseGroupOption[]>
}

export class DiseaseGroupFindOptionsQueryImpl implements QueryHandlerAsync<undefined, DiseaseGroupOption[]> {
    constructor(
        private readonly repository: DiseaseGroupOptionRepository
    ) { }

    async handleAsync(): Promise<DiseaseGroupOption[]> {
        const options = await this.repository.findManyAsync({ filter: [] });
        const groupedData = options.reduce<Record<string, DiseaseGroupOption>>((prev, curr) => {
            if (!prev[curr.groupValue]) {
                prev[curr.groupValue] = {
                    value: curr.groupValue,
                    label: curr.groupLabel,
                    children: []
                }
            }

            prev[curr.groupValue].children.push({
                label: curr.diseaseLabel,
                value: curr.diseaseValue,
            })

            return prev;
        }, {});
        return Object.values(groupedData);
    }
}