import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { DiseaseEntity } from "../entities/disease.entity";

@Injectable()
export class DiseaseRepository
    extends AbstractRepository<number, DiseaseEntity> {

    constructor(
        @InjectRepository(DiseaseEntity) private readonly diseaseModel: Repository<DiseaseEntity>
    ) {
        super(diseaseModel);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<DiseaseEntity>): Promise<void> {
        await this.findOneAndUpdate(filterOptions, { status: false });
    }
}