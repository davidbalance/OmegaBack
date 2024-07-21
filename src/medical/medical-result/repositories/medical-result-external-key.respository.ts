import { AbstractRepository } from "@/shared/sql-database";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MedicalResultExternalKey } from "../entities/medical-result-external-key.entity";

@Injectable()
export class MedicalResultExternalKeyRepository extends AbstractRepository<number, MedicalResultExternalKey> {

    constructor(
        @InjectRepository(MedicalResultExternalKey) private readonly keyModel: Repository<MedicalResultExternalKey>
    ) {
        super(keyModel);
    }
}