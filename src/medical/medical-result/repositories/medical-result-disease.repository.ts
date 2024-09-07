import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MedicalResultDiseaseEntity } from "../entities/medical-result-disease.entity";

@Injectable()
export class MedicalResultDiseaseRepository
    extends AbstractRepository<number, MedicalResultDiseaseEntity> {

    constructor(
        @InjectRepository(MedicalResultDiseaseEntity) private readonly repo: Repository<MedicalResultDiseaseEntity>
    ) {
        super(repo);
    }
}