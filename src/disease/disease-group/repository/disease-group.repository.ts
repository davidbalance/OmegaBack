import { Injectable } from "@nestjs/common";
import { DiseaseGroupEntity } from "../entities/disease-group.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { AbstractRepository } from "@/shared/sql-database/abstract.repository";

@Injectable()
export class DiseaseGroupRepository
    extends AbstractRepository<number, DiseaseGroupEntity> {

    constructor(
        @InjectRepository(DiseaseGroupEntity) private readonly _repo: Repository<DiseaseGroupEntity>
    ) {
        super(_repo);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<DiseaseGroupEntity>): Promise<void> {
        await this.findOneAndUpdate(filterOptions, { status: false });
    }
}