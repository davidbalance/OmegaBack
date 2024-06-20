import { SelectorOption } from "@/shared";
import { Injectable, Inject } from "@nestjs/common";
import { DiseaseGroupRepository } from "../disease-group.repository";

@Injectable()
export class SelectorService {
    constructor(
        @Inject(DiseaseGroupRepository) private readonly repository: DiseaseGroupRepository
    ) { }

    async find(): Promise<SelectorOption<number>[]> {
        const diseases = await this.repository.createQuery('group')
            .select('group.id', 'key')
            .addSelect('group.name', 'label')
            .where('group.status = :status', { status: true })
            .getRawMany<SelectorOption<number>>();
        return diseases;
    }
}