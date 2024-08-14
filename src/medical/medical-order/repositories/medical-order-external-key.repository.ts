import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicalOrderExternalKey } from "../entities/medical-order-external-key.entity";

@Injectable()
export class MedicalOrderExternalKeyRepository
    extends AbstractRepository<number, MedicalOrderExternalKey> {

    constructor(
        @InjectRepository(MedicalOrderExternalKey) private readonly keyModel: Repository<MedicalOrderExternalKey>
    ) {
        super(keyModel);
    }
}