import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Doctor } from "../entities/doctor.entity";

export class DoctorRepository
    extends AbstractRepository<number, Doctor> {

    constructor(
        @InjectRepository(Doctor) private readonly doctorModel: Repository<Doctor>
    ) {
        super(doctorModel);
    }
}