import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DoctorEntity } from "../entities/doctor.entity";

export class DoctorRepository
    extends AbstractRepository<number, DoctorEntity> {

    constructor(
        @InjectRepository(DoctorEntity) model: Repository<DoctorEntity>
    ) {
        super(model);
    }
}