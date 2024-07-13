import { Inject, Injectable } from "@nestjs/common";
import { DiseaseRepository } from "../disease.repository";
import { SelectorOption } from "@/shared";

@Injectable()
export class SelectorService {
    constructor(
        @Inject(DiseaseRepository) private readonly repository: DiseaseRepository
    ) { }

    /**
     * Encuentra todas las morbilidades activas y solo retorna un key y label.
     * @param group 
     * @returns 
     */
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