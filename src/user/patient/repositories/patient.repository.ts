import { Injectable } from "@nestjs/common";
import { PatientEntity } from "../entities/patient.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { AbstractRepository } from "@/shared/sql-database/abstract.repository";

@Injectable()
export class PatientRepository
    extends AbstractRepository<number, PatientEntity> {

    constructor(
        @InjectRepository(PatientEntity) private readonly patientModel: Repository<PatientEntity>
    ) {
        super(patientModel);
    }

    async count(filterOptions: FindManyOptions<PatientEntity>): Promise<number> {
        return this.patientModel.count(filterOptions);
    }
}