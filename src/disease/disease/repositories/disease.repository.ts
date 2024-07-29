import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "@/shared/sql-database";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { Disease } from "../entities/disease.entity";

@Injectable()
export class DiseaseRepository
    extends AbstractRepository<number, Disease> {

    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(Disease) private readonly diseaseModel: Repository<Disease>
    ) {
        super(diseaseModel);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<Disease>): Promise<void> {
        await this.findOneAndUpdate(filterOptions, { status: false });
    }
}