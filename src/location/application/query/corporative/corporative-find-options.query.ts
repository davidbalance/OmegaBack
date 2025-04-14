import { CompanyOption } from "@omega/location/core/models/corporative/company-option.model";
import { CorporativeOption } from "@omega/location/core/models/corporative/corporative-option.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { CompanyOptionRepository, CorporativeOptionRepository } from "../../repository/model.repositories";

export class CorporativeFindOptionsQuery implements QueryHandlerAsync<undefined, CorporativeOption[]> {
    constructor(
        private readonly companyRepository: CompanyOptionRepository,
        private readonly corporativeRepository: CorporativeOptionRepository,
    ) { }
    async handleAsync(): Promise<CorporativeOption[]> {
        const companyBrute = await this.companyRepository.findManyAsync({ filter: [] });
        const companyOptions = companyBrute.reduce<Record<string, CompanyOption>>((prev, curr) => {
            if (!prev[curr.companyValue]) {
                prev[curr.companyValue] = {
                    value: curr.companyValue,
                    label: curr.companyLabel,
                    children: []
                }
            }

            prev[curr.companyValue].children.push({
                label: curr.branchLabel,
                value: curr.branchValue,
            })

            return prev;
        }, {});

        const corporativeBrute = await this.corporativeRepository.findManyAsync({ filter: [] });
        const groupedData = corporativeBrute.reduce<Record<string, CorporativeOption>>((prev, curr) => {
            if (!prev[curr.corporativeValue]) {
                prev[curr.corporativeValue] = {
                    value: curr.corporativeValue,
                    label: curr.corporativeLabel,
                    children: []
                }
            }

            if (companyOptions[curr.companyValue]) {
                prev[curr.corporativeValue].children.push(companyOptions[curr.companyValue])
            }

            return prev;
        }, {});

        return Object.values(groupedData);
    }
}