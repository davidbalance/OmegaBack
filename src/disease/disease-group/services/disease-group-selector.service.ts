import { Injectable, Inject } from "@nestjs/common";
import { DiseaseGroupRepository } from "../repository/disease-group.repository";
import { ISelectorOptionService, ISelectorOption } from "@/shared/utils/bases/base.selector";

@Injectable()
export class DiseaseGroupSelectorService implements ISelectorOptionService<number> {
    constructor(
        @Inject(DiseaseGroupRepository) private readonly repository: DiseaseGroupRepository
    ) { }

    async find(_: any = null): Promise<ISelectorOption<number>[]> {
        const diseases = await this.repository.query('group')
            .select('group.id', 'key')
            .addSelect('group.name', 'label')
            .where('group.status = :status', { status: true })
            .getRawMany<ISelectorOption<number>>();
        return diseases;
    }
}