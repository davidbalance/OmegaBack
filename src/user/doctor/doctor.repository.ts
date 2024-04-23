import { AbstractRepository } from "src/shared";
import { Doctor } from "./entities/doctor.entity";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

export class DoctorRepository
    extends AbstractRepository<number, Doctor> {

    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(Doctor) private readonly doctorModel: Repository<Doctor>
    ) {
        super(doctorModel);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findOneAndDelete(_filterOptions: FindOptionsWhere<Doctor>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}