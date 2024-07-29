import { Injectable, Inject } from "@nestjs/common";
import { DiseaseGroupRepository } from "../repository/disease-group.repository";
import { SelectorOptionService, SelectorOption } from "@/shared/utils/bases/base.selector";

@Injectable()
export class DiseaseGroupSelectorService implements SelectorOptionService<number> {
    constructor(
        @Inject(DiseaseGroupRepository) private readonly repository: DiseaseGroupRepository
    ) { }

    async find(_: any = null): Promise<SelectorOption<number>[]> {
        const diseases = await this.repository.query('group')
            .select('group.id', 'key')
            .addSelect('group.name', 'label')
            .where('group.status = :status', { status: true })
            .getRawMany<SelectorOption<number>>();
        return diseases;
    }
}