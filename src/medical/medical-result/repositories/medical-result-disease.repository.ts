import { AbstractRepository } from "@/shared/sql-database";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { MedicalResult } from "../entities/result.entity";
import { MedicalResultDisease } from "../entities/result-disease.entity";

@Injectable()
export class MedicalResultDiseaseRepository
    extends AbstractRepository<number, MedicalResultDisease> {

    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(MedicalResultDisease) private readonly repo: Repository<MedicalResultDisease>
    ) {
        super(repo);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<MedicalResult>): Promise<void> {
        await this.repo.delete(filterOptions);
    }
}