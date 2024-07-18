import { SelectorOption } from "@/shared";
import { Injectable, Inject } from "@nestjs/common";
import { DiseaseGroupRepository } from "../repository/disease-group.repository";

@Injectable()
export class DiseaseGroupSelectorService {
    constructor(
        @Inject(DiseaseGroupRepository) private readonly repository: DiseaseGroupRepository
    ) { }

    async find(): Promise<SelectorOption<number>[]> {
        const diseases = await this.repository.query('group')
            .select('group.id', 'key')
            .addSelect('group.name', 'label')
            .where('group.status = :status', { status: true })
            .getRawMany<SelectorOption<number>>();
        return diseases;
    }
}