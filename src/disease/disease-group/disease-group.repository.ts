import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "src/shared";
import { DiseaseGroup } from "./entities/disease-group.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class DiseaseGroupRepository
    extends AbstractRepository<number, DiseaseGroup> {

    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(DiseaseGroup) private readonly groupModel: Repository<DiseaseGroup>
    ) {
        super(groupModel);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<DiseaseGroup>): Promise<void> {
        await this.findOneAndUpdate(filterOptions, { status: false });
    }
}