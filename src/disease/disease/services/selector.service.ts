import { Inject, Injectable } from "@nestjs/common";
import { DiseaseRepository } from "../disease.repository";
import { SelectorOption } from "@/shared";

@Injectable()
export class SelectorService {
    constructor(
        @Inject(DiseaseRepository) private readonly repository: DiseaseRepository
    ) { }

    async find(group: number): Promise<SelectorOption<number>[]> {
        const diseases = await this.repository.createQuery('disease')
            .select('disease.id', 'key')
            .addSelect('disease.name', 'label')
            .leftJoinAndSelect('disease.group', 'group', 'group.id = :groupId', { groupId: group })
            .where('group.status = :status', { status: true })
            .getRawMany<SelectorOption<number>>();
        return diseases;
    }
}