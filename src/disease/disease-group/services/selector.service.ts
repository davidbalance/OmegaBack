import { SelectorOption } from "@/shared";
import { Injectable, Inject } from "@nestjs/common";
import { DiseaseGroupRepository } from "../disease-group.repository";

@Injectable()
export class SelectorService {
    constructor(
        @Inject(DiseaseGroupRepository) private readonly repository: DiseaseGroupRepository
    ) { }

    /**
     * Encuentra todos los grupos de morbilidades activos y solo retorna un key y label.
     * @returns 
     */
    async find(): Promise<SelectorOption<number>[]> {
        const diseases = await this.repository.query('group')
            .select('group.id', 'key')
            .addSelect('group.name', 'label')
            .where('group.status = :status', { status: true })
            .getRawMany<SelectorOption<number>>();
        return diseases;
    }
}