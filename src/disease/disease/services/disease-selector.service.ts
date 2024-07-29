import { Inject, Injectable } from "@nestjs/common";
import { ISelectorOption, ISelectorOptionService } from "@/shared/utils/bases/base.selector";
import { DiseaseRepository } from "../repositories/disease.repository";

@Injectable()
export class DiseaseSelectorService implements ISelectorOptionService<number> {
    constructor(
        @Inject(DiseaseRepository) private readonly repository: DiseaseRepository
    ) { }

    async find(group: number): Promise<ISelectorOption<number>[]> {
        const diseases = await this.repository.query('disease')
            .select('disease.id', 'key')
            .addSelect('disease.name', 'label')
            .leftJoinAndSelect('disease.group', 'group', 'group.id = :groupId', { groupId: group })
            .where('group.status = :status', { status: true })
            .getRawMany<ISelectorOption<number>>();
        return diseases;
    }


}