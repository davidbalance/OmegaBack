import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "src/shared";
import { Patient } from "./entities/patient.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";

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

    findOneAndDelete(_filterOptions: FindOptionsWhere<Patient>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}