import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MedicalResultExternalKeyEntity } from "../entities/medical-result-external-key.entity";

@Injectable()
export class MedicalResultExternalKeyRepository extends AbstractRepository<number, MedicalResultExternalKeyEntity> {

    constructor(
        @InjectRepository(MedicalResultExternalKeyEntity) private readonly keyModel: Repository<MedicalResultExternalKeyEntity>
    ) {
        super(keyModel);
    }
}