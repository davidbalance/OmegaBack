import { SelectorOption, SelectorOptionService } from "@/shared/utils/bases/base.selector";
import { Injectable, Inject } from "@nestjs/common";
import { DiseaseRepository } from "../repositories/disease.repository";


@Injectable()
export class DiseaseSelectorService implements SelectorOptionService<number> {
    constructor(
        @Inject(DiseaseRepository) private readonly repository: DiseaseRepository
    ) { }

    async find(group: number): Promise<SelectorOption<number>[]> {
        const diseases = await this.repository.query('disease')
            .select('disease.id', 'key')
            .addSelect('disease.name', 'label')
            .leftJoinAndSelect('disease.group', 'group', 'group.id = :groupId', { groupId: group })
            .where('group.status = :status', { status: true })
            .getRawMany<SelectorOption<number>>();
        return diseases;
    }


}