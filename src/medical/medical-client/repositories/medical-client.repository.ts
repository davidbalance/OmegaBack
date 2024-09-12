import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { MedicalClientEntity } from "../entities/medical-client.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class MedicalClientRepository extends AbstractRepository<number, MedicalClientEntity> {

    protected logger: Logger;

    constructor(
        @InjectRepository(MedicalClientEntity) private readonly repo: Repository<MedicalClientEntity>
    ) {
        super(repo);
    }
}