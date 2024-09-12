import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicalEmailEntity } from "../entities/medical-email.entity";

@Injectable()
export class MedicalEmailRepository extends AbstractRepository<number, MedicalEmailEntity> {

    protected logger: Logger;

    constructor(
        @InjectRepository(MedicalEmailEntity) private readonly repo: Repository<MedicalEmailEntity>
    ) {
        super(repo);
    }
}