import { Injectable } from "@nestjs/common";
import { DiseaseGroup } from "../entities/disease-group.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { AbstractRepository } from "@/shared/sql-database/abstract.repository";

@Injectable()
export class DiseaseGroupRepository
    extends AbstractRepository<number, DiseaseGroup> {

    constructor(
        @InjectRepository(DiseaseGroup) private readonly groupModel: Repository<DiseaseGroup>
    ) {
        super(groupModel);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<DiseaseGroup>): Promise<void> {
        await this.findOneAndUpdate(filterOptions, { status: false });
    }
}