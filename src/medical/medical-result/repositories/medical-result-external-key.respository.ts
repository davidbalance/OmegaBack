import { ExternalKey } from "@/medical/medical-order/external-key/entities/external-key.entity";
import { AbstractRepository } from "@/shared/sql-database";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class MedicalResultExternalKeyRepository extends AbstractRepository<number, ExternalKey> {

    constructor(
        @InjectRepository(ExternalKey) private readonly keyModel: Repository<ExternalKey>
    ) {
        super(keyModel);
    }
}