import { Injectable, Logger } from "@nestjs/common";
import { Patient } from "./entities/patient.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import { AbstractRepository } from "@/shared/sql-database";

@Injectable()
export class PatientRepository
    extends AbstractRepository<number, Patient> {

    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(Patient) private readonly patientModel: Repository<Patient>
    ) {
        super(patientModel);
    }

    async count(filterOptions: FindManyOptions<Patient>): Promise<number> {
        return this.patientModel.count(filterOptions);
    }
}