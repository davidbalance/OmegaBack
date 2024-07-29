import { AbstractRepository } from "@/shared/sql-database";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MedicalResultDisease } from "../entities/medical-result-disease.entity";

@Injectable()
export class MedicalResultDiseaseRepository
    extends AbstractRepository<number, MedicalResultDisease> {

    constructor(
        @InjectRepository(MedicalResultDisease) private readonly repo: Repository<MedicalResultDisease>
    ) {
        super(repo);
    }
}