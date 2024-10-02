import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { MedicalResultEntity } from "../entities/medical-result.entity";

@Injectable()
export class MedicalResultRepository
    extends AbstractRepository<number, MedicalResultEntity> {

    constructor(
        @InjectRepository(MedicalResultEntity) private readonly resultModel: Repository<MedicalResultEntity>
    ) {
        super(resultModel);
    }

    public async updateInIds(ids: number[], updateOptions: Partial<MedicalResultEntity>): Promise<void> {
        await this.resultModel.update({ id: In(ids) }, updateOptions);
    }
}